package com.zewigfield.disaster_watch.model.DTO;

import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;

import java.time.Instant;

public class FlashFloodAlertDTO {
    private final String id;
    private final String areaDesc;
    private final String event;
    private final String description;
    private final Instant effective;
    private final Instant expires;

    public FlashFloodAlertDTO(FlashFloodAlert alert) {
        this.id = alert.getId();
        this.areaDesc = alert.getAreaDesc();
        this.event = alert.getEvent();
        this.description = alert.getDescription();
        this.effective = alert.getEffective();
        this.expires = alert.getExpires();
    }

    public String getId() { return id; }
    public String getAreaDesc() { return areaDesc; }
    public String getEvent() { return event; }
    public String getDescription() { return description; }
    public Instant getEffective() { return effective; }
    public Instant getExpires() { return expires; }
}