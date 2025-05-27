package com.zewigfield.disaster_watch.controller;

import com.zewigfield.disaster_watch.model.Disaster;
import com.zewigfield.disaster_watch.service.DisasterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    private final DisasterService disasterService;

    public DisasterController(DisasterService disasterService) {
        this.disasterService = disasterService;
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
}
