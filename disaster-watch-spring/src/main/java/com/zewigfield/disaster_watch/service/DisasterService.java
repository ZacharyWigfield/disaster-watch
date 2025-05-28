package com.zewigfield.disaster_watch.service;

import com.zewigfield.disaster_watch.model.DTO.Disaster;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DisasterService {

    public List<Disaster> searchDisasters(double lat, double lon, int radius, List<String> types) {
        // For now, return dummy data
        List<Disaster> dummyResults = new ArrayList<>();

        dummyResults.add(new Disaster(
                "1",
                "Earthquake",
                "Minor quake in area",
                lat,
                lon,
                "Moderate",
                "USGS",
                "2025-05-25"
        ));

        dummyResults.add(new Disaster(
                "2",
                "Flood",
                "Flash flood reported",
                lat + 0.1,
                lon + 0.1,
                "Severe",
                "NOAA",
                "2025-05-24"
        ));

        return dummyResults;
    }
}
