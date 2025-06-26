package com.zewigfield.disaster_watch.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.zewigfield.disaster_watch.model.record.Coordinates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class CacheConfig {

    @Bean
    public Cache<String, Coordinates> dynamicCityCache() {
        return Caffeine.newBuilder()
                .maximumSize(900)
                .expireAfterWrite(Duration.ofDays(30))
                .build();
    }
}
