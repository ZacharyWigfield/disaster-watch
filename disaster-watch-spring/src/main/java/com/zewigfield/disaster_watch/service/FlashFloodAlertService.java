package com.zewigfield.disaster_watch.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;
import com.zewigfield.disaster_watch.repository.FlashFloodAlertRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;

@Service
public class FlashFloodAlertService {

    private final FlashFloodAlertRepository repository;
    // rest template is a spring provided class used for http requests to external APIs
    // spring recommends using WebClient instead, so look into this
    private final RestTemplate restTemplate;

    public FlashFloodAlertService(FlashFloodAlertRepository repository) {
        this.repository = repository;
        this.restTemplate = new RestTemplate();
    }

    public void fetchAndStoreAlerts() {
        String url = "https://api.weather.gov/alerts/active?status=actual&event=Flood Warning&severity=Extreme,Severe&certainty=Observed";

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "DisasterWatchApp/1.0 (zewigfield@gmail.com)");
        HttpEntity<Void> entity = new HttpEntity<>(headers);


        ResponseEntity<JsonNode> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                JsonNode.class
        );

        // JsonNode is a generic JSON tree structure class. Useful for unpredictable JSON. Could refactor
        JsonNode root = response.getBody();
        if (root == null || !root.has("features")) return;

        for (JsonNode feature : root.get("features")) {
            JsonNode properties = feature.get("properties");
            JsonNode geocode = properties.get("geocode");

            FlashFloodAlert alert = new FlashFloodAlert();
            alert.setId(properties.get("id").asText());
            alert.setAreaDesc(properties.get("areaDesc").asText(null));
            alert.setEvent(properties.get("event").asText(null));
            alert.setDescription(properties.get("description").asText(null));
            alert.setEffective(Instant.parse(properties.get("effective").asText(null)));
            alert.setExpires(Instant.parse(properties.get("expires").asText(null)));
            alert.setGeometry(feature.get("geometry").toString());
            alert.setSameGeocode(geocode.get("SAME").toString());
            alert.setUgcGeocode(geocode.get("UGC").toString());

            repository.save(alert);
        }
    }
}

