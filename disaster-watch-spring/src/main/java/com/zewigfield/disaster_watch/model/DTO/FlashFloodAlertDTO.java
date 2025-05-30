package com.zewigfield.disaster_watch.model.DTO;

import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

public class FlashFloodAlertDTO {
    private final String id;
    private final List<String> areaDesc;
    private final String event;
    private final String description;
    private final Instant effective;
    private final Instant expires;

    public FlashFloodAlertDTO(FlashFloodAlert alert) {
        this.id = alert.getId();
        this.areaDesc = parseAreaDesc(alert.getAreaDesc());
        this.event = alert.getEvent();
        this.description = alert.getDescription();
        this.effective = alert.getEffective();
        this.expires = alert.getExpires();
    }

    private List<String> parseAreaDesc (String areaDesc){
        return Arrays.stream(areaDesc.split(";")).map(String::trim).toList();
    }

    public String getId() { return id; }
    public List<String> getAreaDesc() { return areaDesc; }
    public String getEvent() { return event; }
    public String getDescription() { return description; }
    public Instant getEffective() { return effective; }
    public Instant getExpires() { return expires; }
}