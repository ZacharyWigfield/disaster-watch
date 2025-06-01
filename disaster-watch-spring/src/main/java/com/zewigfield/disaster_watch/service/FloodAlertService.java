package com.zewigfield.disaster_watch.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import com.zewigfield.disaster_watch.repository.FloodAlertRepository;
import org.locationtech.jts.geom.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;

@Service
public class FloodAlertService {

    private final FloodAlertRepository repository;
    // rest template is a spring provided class used for http requests to external APIs
    // spring recommends using WebClient instead, so look into this
    private final RestTemplate restTemplate;

    public FloodAlertService(FloodAlertRepository repository) {
        this.repository = repository;
        this.restTemplate = new RestTemplate();
    }

    public void fetchAndStoreAlerts() {
        String url = "https://api.weather.gov/alerts/active?status=actual&event=Flood Warning,Flash Flood Warning&severity=Extreme,Severe,Moderate&certainty=Observed,Likely";

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
            JsonNode firstCoord = feature.get("geometry").get("coordinates").get(0).get(0); // getting first lat/long value

            double lon = firstCoord.get(0).asDouble();
            double lat = firstCoord.get(1).asDouble();

            GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
            Point point = geometryFactory.createPoint(new Coordinate(lon, lat));

            FloodAlertEntity alert = new FloodAlertEntity();
            alert.setId(properties.get("id").asText());
            alert.setAreaDesc(properties.get("areaDesc").asText(null));
            alert.setEvent(properties.get("event").asText(null));
            alert.setDescription(properties.get("description").asText(null));
            alert.setCertainty(properties.get("certainty").asText(null));
            alert.setSeverity(properties.get("severity").asText(null));
            alert.setUrgency(properties.get("urgency").asText(null));
            alert.setEffective(Instant.parse(properties.get("effective").asText(null)));
            alert.setExpires(Instant.parse(properties.get("expires").asText(null)));
            alert.setLatitude(lat);
            alert.setLongitude(lon);
            alert.setLocation(point);
            alert.setSameGeocode(geocode.get("SAME").toString());
            alert.setUgcGeocode(geocode.get("UGC").toString());

            repository.save(alert);
        }
    }

    public List<FloodAlertDTO> getFilteredFloodAlerts(List<String> eventType, Instant startDate, Instant endDate, String searchLocation, int radius) {
        return this.repository.findByParams(eventType, startDate, endDate);
    }

}

