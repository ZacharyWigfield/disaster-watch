package com.zewigfield.disaster_watch.repository;

import com.zewigfield.disaster_watch.model.entity.FlashFloodAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;

public interface FlashFloodAlertRepository extends JpaRepository<FlashFloodAlert, String> {
    @Modifying
    @Transactional
    @Query("DELETE FROM FlashFloodAlert f WHERE f.effective < :cutoff")
    int deleteByEffectiveBefore(Instant cutoff);
}
