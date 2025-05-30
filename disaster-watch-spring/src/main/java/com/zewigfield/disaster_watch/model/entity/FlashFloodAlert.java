package com.zewigfield.disaster_watch.model.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "flash_flood_alerts")
public class FlashFloodAlert {

    @Id
    private String id;

    @Column(name = "area_desc", columnDefinition = "TEXT")
    private String areaDesc;

    @Column(columnDefinition = "TEXT")
    private String event;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Instant effective;

    private Instant expires;

    @Column(columnDefinition = "TEXT")
    private String geometry;

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

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
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
