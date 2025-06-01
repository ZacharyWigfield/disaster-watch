package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.service.FloodAlertService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    private final FloodAlertService floodAlertService;

    public DisasterController(
            FloodAlertService floodAlertService
    ) {
        this.floodAlertService = floodAlertService;
    }

    // returns flood and flash flood warnings of extreme and severe severity and observed and likely certainty
    @GetMapping("/floods/warnings")
    public List<FloodAlertDTO> getFloodWarnings(
            @RequestParam String searchLocation,
            @RequestParam int radius,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate,
            @RequestParam List<String> eventType
    ) {
        return floodAlertService.getFilteredFloodAlerts(eventType, startDate, endDate, searchLocation, radius);
    }
}
