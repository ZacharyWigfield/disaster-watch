package com.zewigfield.disaster_watch.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.zewigfield.disaster_watch.model.record.Coordinates;
import com.zewigfield.disaster_watch.utils.PreloadedCities;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GeocodingCacheService {

    private final Map<String, Coordinates> preloadedCities = PreloadedCities.get();
    private final Cache<String, Coordinates> dynamicCache;

    public GeocodingCacheService(Cache<String, Coordinates> dynamicCache) {
        this.dynamicCache = dynamicCache;
    }

    private String normalize(String key) {
        return key.trim().toLowerCase()
                .replaceAll("\\s+", " ")
                .replaceAll("[^a-z0-9 ]", "");
    }

    public Coordinates get(String query) {
        String key = normalize(query);
        if (preloadedCities.containsKey(key)) {
            return preloadedCities.get(key);
        }
        return dynamicCache.getIfPresent(key);
    }

    public void put(String query, Coordinates coords) {
        String key = normalize(query);
        if (!preloadedCities.containsKey(key)) {
            dynamicCache.put(key, coords);
        }
    }

    public boolean contains(String query) {
        String key = normalize(query);
        return preloadedCities.containsKey(key) || dynamicCache.getIfPresent(key) != null;
    }
}