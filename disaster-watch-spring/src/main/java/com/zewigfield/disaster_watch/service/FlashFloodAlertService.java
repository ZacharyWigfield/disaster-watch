package com.zewigfield.disaster_watch.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;
import com.zewigfield.disaster_watch.repository.FlashFloodAlertRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Iterator;

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
        String url = "https://api.weather.gov/alerts?event=Flash%20Flood%20Warning";

        // JsonNode is a generic JSON tree structure class. Useful for unpredictable JSON. Could refactor
        JsonNode root = restTemplate.getForObject(url, JsonNode.class);
        if (root == null || !root.has("features")) return;

        for (JsonNode feature : root.get("features")) {
            JsonNode properties = feature.get("properties");

            FlashFloodAlert alert = new FlashFloodAlert();
            alert.setId(properties.get("id").asText());
            alert.setAreaDesc(properties.get("areaDesc").asText());
            alert.setEvent(properties.get("event").asText());
            alert.setDescription(properties.get("description").asText(null));
            alert.setEffective(Instant.parse(properties.get("effective").asText()));
            alert.setExpires(Instant.parse(properties.get("expires").asText()));
            alert.setGeometry(feature.get("geometry").toString());

            repository.save(alert);
        }
    }


}
