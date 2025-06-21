package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.model.DTO.FloodAlertsWithUserLocationDTO;
import com.zewigfield.disaster_watch.service.FloodAlertService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/floods/all")
    public List<FloodAlertDTO> getAllFloods() {
        return floodAlertService.getAllFloodAlerts();
    }

    // returns flood and flash flood warnings of extreme and severe severity and observed and likely certainty
    @GetMapping("/floods/warnings")
    public FloodAlertsWithUserLocationDTO getFloodWarnings(
            @RequestParam String searchLocation,
            @RequestParam int radius,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate,
            @RequestParam List<String> eventType
    ) {
        return floodAlertService.getFilteredFloodAlerts(eventType, startDate, endDate, searchLocation, radius);
    }

    @GetMapping("floods/warnings/{id}")
    public ResponseEntity<FloodAlertDTO> getEventByID(@PathVariable Long id) {
        try {
            FloodAlertDTO dto = floodAlertService.getEventByID(id);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
