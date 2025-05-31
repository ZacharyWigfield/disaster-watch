package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.repository.FloodAlertRepository;
import org.springframework.web.bind.annotation.*;

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
    public List<FloodAlertDTO> getFloodWarnings() {
        return floodAlertRepository.findAll().stream()
                .map(FloodAlertDTO::new)
                .toList();
    }
}
