package com.zewigfield.disaster_watch.model.entity;

import jakarta.persistence.*;
import java.time.Instant;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "flood_alerts")
public class FloodAlertEntity {

    @Id
    private String id;

    @Column(name = "area_desc", columnDefinition = "TEXT")
    private String areaDesc;

    @Column(columnDefinition = "TEXT")
    private String event;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String severity;

    private String certainty;

    private String urgency;

    private Instant effective;

    private Instant expires;

    private Double latitude;

    private Double longitude;

    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    @Column(name = "same_geocode")
    private String sameGeocode;

    @Column(name = "ugc_geocode")
    private String ugcGeocode;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAreaDesc() {
        return areaDesc;
    }

    public void setAreaDesc(String areaDesc) {
        this.areaDesc = areaDesc;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getCertainty() {
        return certainty;
    }

    public void setCertainty(String certainty) {
        this.certainty = certainty;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public Instant getEffective() {
        return effective;
    }

    public void setEffective(Instant effective) {
        this.effective = effective;
    }

    public Instant getExpires() {
        return expires;
    }

    public void setExpires(Instant expires) {
        this.expires = expires;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public String getSameGeocode() {
        return sameGeocode;
    }

    public void setSameGeocode(String sameGeocode) {
        this.sameGeocode = sameGeocode;
    }

    public String getUgcGeocode() {
        return ugcGeocode;
    }

    public void setUgcGeocode(String ugcGeocode) {
        this.ugcGeocode = ugcGeocode;
    }

}
