package com.zewigfield.disaster_watch.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Coordinates geocode (String query){
        String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("q", query)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .build()
                .toUriString();

        GeocodeResponse[] response = restTemplate.getForObject(url, GeocodeResponse[].class);

        if (response != null && response.length > 0){
            double lat = Double.parseDouble(response[0].lat);
            double lon = Double.parseDouble(response[0].lon);
            return new Coordinates(lat, lon);
        } else {
            throw new IllegalArgumentException("Could not resolve location: " + query);
        }
    }

    private static class GeocodeResponse {
        public String lat;
        public String lon;
    }

    public record Coordinates(double latitude, double longitude) {}
}
