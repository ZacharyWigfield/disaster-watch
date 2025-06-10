package com.zewigfield.disaster_watch.model.DTO;

import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Polygon;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class FloodAlertDTO {
    private final Long id;
    private final List<String> areaDesc;
    private final String event;
    private final String description;
    private final String certainty;
    private final String severity;
    private final String urgency;
    private final Instant effective;
    private final Instant expires;
    private final Double latitude;
    private final Double longitude;
    private final Map<String, Object> floodAreaPolygon;

    public FloodAlertDTO(FloodAlertEntity alert) {
        this.id = alert.getId();
        this.areaDesc = parseAreaDesc(alert.getAreaDesc());
        this.event = alert.getEvent();
        this.description = alert.getDescription();
        this.certainty = alert.getCertainty();
        this.severity = alert.getSeverity();
        this.urgency = alert.getUrgency();
        this.effective = alert.getEffective();
        this.expires = alert.getExpires();
        this.latitude = alert.getLatitude();
        this.longitude = alert.getLongitude();
        this.floodAreaPolygon = convertToGeoJson(alert.getFloodArea());
    }

    private List<String> parseAreaDesc(String areaDesc) {
        return Arrays.stream(areaDesc.split(";")).map(String::trim).toList();
    }

    public Long getId() {
        return id;
    }

    public List<String> getAreaDesc() {
        return areaDesc;
    }

    public String getEvent() {
        return event;
    }

    public String getDescription() {
        return description;
    }

    public String getCertainty() {
        return certainty;
    }

    public String getSeverity() {
        return severity;
    }

    public String getUrgency() {
        return urgency;
    }

    public Instant getEffective() {
        return effective;
    }

    public Instant getExpires() {
        return expires;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Map<String, Object> getPolygonGeoJson() {
        return floodAreaPolygon;
    }

    private Map<String, Object> convertToGeoJson(Polygon polygon) {
        if (polygon == null) return null;

        Map<String, Object> geoJson = new java.util.HashMap<>();
        geoJson.put("type", "Polygon");

        List<List<double[]>> coordinates = new java.util.ArrayList<>();
        List<double[]> outerRing = new java.util.ArrayList<>();

        for (Coordinate coord : polygon.getExteriorRing().getCoordinates()) {
            outerRing.add(new double[]{coord.x, coord.y});
        }

        coordinates.add(outerRing);
        geoJson.put("coordinates", coordinates);
        return geoJson;
    }

}