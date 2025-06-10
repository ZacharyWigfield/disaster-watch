package com.zewigfield.disaster_watch.repository;

import com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO;
import com.zewigfield.disaster_watch.model.entity.FloodAlertEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


public interface FloodAlertRepository extends JpaRepository<FloodAlertEntity, String> {
    @Modifying
    @Transactional
    @Query("DELETE FROM FloodAlertEntity f WHERE f.effective < :cutoff")
    int deleteByEffectiveBefore(Instant cutoff);

    @Query("SELECT new com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO(f) FROM FloodAlertEntity f")
    List<FloodAlertDTO> findAllAsDTO();

    Optional<FloodAlertEntity> findByExternalId(String externalId);

    @Query(value = """
            SELECT new com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO(f)
            FROM FloodAlertEntity f
            WHERE f.event IN :eventTypes
            AND f.effective BETWEEN :start AND :end
            """)
    List<FloodAlertDTO> findByParams(
            @Param("eventTypes") List <String> eventTypes,
            @Param("start") Instant startDate,
            @Param("end") Instant endDate
    );
}
