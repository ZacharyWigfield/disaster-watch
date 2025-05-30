package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.DTO.Disaster;
import com.zewigfield.disaster_watch.model.DTO.FlashFloodAlertDTO;
import com.zewigfield.disaster_watch.repository.FlashFloodAlertRepository;
import com.zewigfield.disaster_watch.service.DisasterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    private final DisasterService disasterService;
    private final FlashFloodAlertRepository flashFloodAlertRepository;

    public DisasterController(
            DisasterService disasterService,
            FlashFloodAlertRepository flashFloodAlertRepository
    ) {
        this.disasterService = disasterService;
        this.flashFloodAlertRepository = flashFloodAlertRepository;
    }

    @GetMapping("/search")
    public List<Disaster> searchDisasters(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam(defaultValue = "50") int radius,
            @RequestParam(required = false) List<String> types
    ) {
        return disasterService.searchDisasters(lat, lon, radius, types);
    }

    // these are flood warnings events where flooding has actually been observed and is an extreme or severe severity
    @GetMapping("/floods/warnings")
    public List<FlashFloodAlertDTO> getFloodWarnings() {
        return flashFloodAlertRepository.findAll().stream()
                .map(FlashFloodAlertDTO::new)
                .toList();
    }
}
