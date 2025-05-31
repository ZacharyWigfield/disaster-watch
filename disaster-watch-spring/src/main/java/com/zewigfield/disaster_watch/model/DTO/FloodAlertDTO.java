package com.zewigfield.disaster_watch.model.DTO;

import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

public class FloodAlertDTO {
    private final String id;
    private final List<String> areaDesc;
    private final String event;
    private final String description;
    private final String certainty;
    private final String severity;
    private final String urgency;
    private final Instant effective;
    private final Instant expires;

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
    }

    private List<String> parseAreaDesc (String areaDesc){
        return Arrays.stream(areaDesc.split(";")).map(String::trim).toList();
    }

    public String getId() { return id; }
    public List<String> getAreaDesc() { return areaDesc; }
    public String getEvent() { return event; }
    public String getDescription() { return description; }
    public String getCertainty() { return certainty; }
    public String getSeverity() { return severity; }
    public String getUrgency() {return urgency; }
    public Instant getEffective() { return effective; }
    public Instant getExpires() { return expires; }
}