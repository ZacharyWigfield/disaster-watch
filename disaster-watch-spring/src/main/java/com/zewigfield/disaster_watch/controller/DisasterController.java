package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.repository.FloodAlertRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    private final FloodAlertRepository floodAlertRepository;

    public DisasterController(
            FloodAlertRepository floodAlertRepository
    ) {
        this.floodAlertRepository = floodAlertRepository;
    }

    // returns flood and flash flood warnings of extreme and severe severity and observed and likely certainty
    @GetMapping("/floods/warnings")
    public List<FloodAlertDTO> getFloodWarnings(
            @RequestParam String search,
            @RequestParam int radius,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate,
            @RequestParam List<String> disasterType
    ) {
        return floodAlertRepository.findAll().stream()
                .map(FloodAlertDTO::new)
                .toList();
    }
}
