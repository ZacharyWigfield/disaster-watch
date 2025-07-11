package com.zewigfield.disaster_watch.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.model.DTO.FloodAlertsWithUserLocationDTO;
import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import com.zewigfield.disaster_watch.model.record.Coordinates;
import com.zewigfield.disaster_watch.repository.FloodAlertRepository;
import jakarta.persistence.EntityNotFoundException;
import org.locationtech.jts.geom.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class FloodAlertService {

    private final FloodAlertRepository repository;
    private final RestTemplate restTemplate;
    private final GeocodingService geocodingService;

    public FloodAlertService(FloodAlertRepository repository, GeocodingService geocodingService) {
        this.repository = repository;
        this.restTemplate = new RestTemplate();
        this.geocodingService = geocodingService;
    }

    public void fetchAndStoreAlerts() {
        JsonNode root = fetchFloodAlertJson();
        if (root == null || !root.has("features")) return;

        for (JsonNode feature : root.get("features")) {
            FloodAlertEntity alert = mapJsonToAlertEntity(feature);
            if (repository.findFloodEventByExternalId(alert.getExternalId()).isEmpty()) {
                repository.save(alert);
            }
        }
    }

    private JsonNode fetchFloodAlertJson() {
        String url = "https://api.weather.gov/alerts/active?status=actual&event=Flood Warning,Flash Flood Warning&severity=Extreme,Severe,Moderate&certainty=Observed,Likely";

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "DisasterWatchApp/1.0 (zewigfield@gmail.com)");
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, JsonNode.class
        );

        return response.getBody();
    }

    private FloodAlertEntity mapJsonToAlertEntity(JsonNode feature) {
        JsonNode properties = feature.get("properties");
        JsonNode geocode = properties.get("geocode");
        JsonNode coordinatesNode = feature.get("geometry").get("coordinates");

        Point point = extractFirstPoint(coordinatesNode);
        Polygon polygon = convertToPolygon(coordinatesNode);

        FloodAlertEntity alert = new FloodAlertEntity();
        alert.setExternalId(properties.get("id").asText());
        alert.setAreaDesc(properties.get("areaDesc").asText(null));
        alert.setEvent(properties.get("event").asText(null));
        alert.setDescription(properties.get("description").asText(null));
        alert.setCertainty(properties.get("certainty").asText(null));
        alert.setSeverity(properties.get("severity").asText(null));
        alert.setUrgency(properties.get("urgency").asText(null));
        alert.setEffective(Instant.parse(properties.get("effective").asText(null)));
        alert.setExpires(Instant.parse(properties.get("expires").asText(null)));
        alert.setLatitude(point.getY());
        alert.setLongitude(point.getX());
        alert.setLocation(point);
        alert.setFloodArea(polygon);
        alert.setSameGeocode(geocode.get("SAME").toString());
        alert.setUgcGeocode(geocode.get("UGC").toString());
        return alert;
    }

    private Point extractFirstPoint(JsonNode coordinatesNode) {
        JsonNode firstCoord = coordinatesNode.get(0).get(0);
        double lon = firstCoord.get(0).asDouble();
        double lat = firstCoord.get(1).asDouble();

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        return geometryFactory.createPoint(new Coordinate(lon, lat));
    }

    private Polygon convertToPolygon(JsonNode coordinatesNode) {
        List<Coordinate> coordList = new ArrayList<>();
        for (JsonNode coord : coordinatesNode.get(0)) {
            double lon = coord.get(0).asDouble();
            double lat = coord.get(1).asDouble();
            coordList.add(new Coordinate(lon, lat));
        }

        Coordinate[] coords = coordList.toArray(new Coordinate[0]);
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        LinearRing shell = geometryFactory.createLinearRing(coords);
        return geometryFactory.createPolygon(shell);
    }

    public List<FloodAlertDTO> getAllFloodAlerts() {
        return this.repository.findAllFloodEventsAsDto();
    }

    public FloodAlertDTO getEventByID(Long eventId) {
        return this.repository.findFloodEventDtoById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("FloodAlert with ID " + eventId + " not found"));
    }

    public FloodAlertsWithUserLocationDTO getFilteredFloodAlerts(List<String> eventType, Instant startDate, Instant endDate, String searchLocation, int userRadius) {
        Coordinates userCoords = geocodingService.geocodeFromCache(searchLocation);
        List<FloodAlertEntity> alerts = this.repository.findFloodEventByParams(eventType, startDate, endDate);

        List<FloodAlertDTO> FilteredAlerts = alerts.stream()
                .map(alert -> {
                    double distance = calculateUserToEventDistance(
                            userCoords.latitude(),
                            userCoords.longitude(),
                            alert.getLatitude(),
                            alert.getLongitude()
                    );
                    return new FloodAlertDTO(alert, distance);
                })
                .filter(alert -> alert.getUserToEventDistance() <= userRadius
                )
                .toList();

        return new FloodAlertsWithUserLocationDTO(FilteredAlerts, userCoords.latitude(), userCoords.longitude());
    }

    public List<FloodAlertDTO> getIntersectingEventsByIDWithinLastYear(Long eventId) {
        List<Long> intersectingIds = this.repository.findIntersectingEventsWithinLastYear(eventId);
        List<FloodAlertEntity> events = this.repository.findAllById(intersectingIds);
        return events.stream()
                .map(FloodAlertDTO::new)
                .toList();

    }

    public double calculateUserToEventDistance(double userLat, double userLon, double eventLat, double eventLon) {
        final double EARTH_RADIUS_MILES = 3958.8;
        double dLat = Math.toRadians(eventLat - userLat);
        double dLon = Math.toRadians(eventLon - userLon);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(userLat)) * Math.cos(Math.toRadians(eventLat))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

}

