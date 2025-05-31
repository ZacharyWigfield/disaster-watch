package com.zewigfield.disaster_watch.repository;

import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;

public interface FloodAlertRepository extends JpaRepository<FloodAlertEntity, String> {
    @Modifying
    @Transactional
    @Query("DELETE FROM FloodAlertEntity f WHERE f.effective < :cutoff")
    int deleteByEffectiveBefore(Instant cutoff);
}
