package com.zewigfield.disaster_watch;

import com.zewigfield.disaster_watch.service.FlashFloodAlertService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppStartupRunner implements CommandLineRunner {

    private final FlashFloodAlertService service;

    public AppStartupRunner(FlashFloodAlertService service) {
        this.service = service;
    }

    @Override
    public void run(String... args) {
        service.fetchAndStoreAlerts();
    }
}
