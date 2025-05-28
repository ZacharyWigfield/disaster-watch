package com.zewigfield.disaster_watch.repository;

import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashFloodAlertRepository extends JpaRepository<FlashFloodAlert, String> {
}
