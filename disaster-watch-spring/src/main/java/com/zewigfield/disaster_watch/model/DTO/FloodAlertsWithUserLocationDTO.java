package com.zewigfield.disaster_watch.model.DTO;

import java.util.List;

public class FloodAlertsWithUserLocationDTO {
    private List<FloodAlertDTO> FloodEvents;
    private Double userLat;
    private Double userLong;

    public FloodAlertsWithUserLocationDTO(List<FloodAlertDTO> FloodAlerts, Double userLat, Double userLong) {
        this.FloodEvents = FloodAlerts;
        this.userLat = userLat;
        this.userLong = userLong;
    }

    public List<FloodAlertDTO> getFloodEvents() {
        return FloodEvents;
    }

    public void setFloodEvents(List<FloodAlertDTO> floodAlerts) {
        FloodEvents = floodAlerts;
    }

    public Double getUserLat() {
        return userLat;
    }

    public void setUserLat(Double userLatitude) {
        this.userLat = userLatitude;
    }

    public Double getUserLong() {
        return userLong;
    }

    public void setUserLong(Double userLongitude) {
        this.userLong = userLongitude;
    }

}
