package com.zewigfield.disaster_watch;

import com.zewigfield.disaster_watch.repository.FloodAlertRepository;
import com.zewigfield.disaster_watch.service.FloodAlertService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class AppStartupRunner implements CommandLineRunner {

    private final FloodAlertService service;
    private final FloodAlertRepository repository;

    public AppStartupRunner(FloodAlertService service, FloodAlertRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        pruneOldAlerts();
        service.fetchAndStoreAlerts();
    }

    public void pruneOldAlerts() {
        Instant cutoff = Instant.now().minus(30, ChronoUnit.DAYS);
        repository.deleteByEffectiveBefore(cutoff);
    }
}
