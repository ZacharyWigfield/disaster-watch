package com.zewigfield.disaster_watch;

import com.zewigfield.disaster_watch.repository.FlashFloodAlertRepository;
import com.zewigfield.disaster_watch.service.FlashFloodAlertService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class AppStartupRunner implements CommandLineRunner {

    private final FlashFloodAlertService service;
    private final FlashFloodAlertRepository repository;

    public AppStartupRunner(FlashFloodAlertService service, FlashFloodAlertRepository repository) {
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
