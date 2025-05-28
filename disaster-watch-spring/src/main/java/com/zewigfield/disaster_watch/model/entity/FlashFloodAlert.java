package com.zewigfield.disaster_watch.model.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "flash_flood_alerts")
public class FlashFloodAlert {

    @Id
    private String id;

    @Column(name = "area_desc")
    private String areaDesc;

    private String event;

    private String description;

    private Instant effective;

    private Instant expires;

    private String geometry;

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

}
