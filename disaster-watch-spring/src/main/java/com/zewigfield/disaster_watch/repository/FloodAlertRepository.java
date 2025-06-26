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
    List<FloodAlertDTO> findAllFloodEventAsDTO();

    @Query("""
            SELECT new com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO(f)
            FROM FloodAlertEntity f
            WHERE f.id = :id
            """)
    Optional<FloodAlertDTO> findFloodEventByID(@Param("id") Long id);

    Optional<FloodAlertEntity> findFloodEventByExternalId(String externalId);

    @Query("""
            SELECT f
            FROM FloodAlertEntity f
            WHERE f.event IN :eventTypes
            AND f.effective BETWEEN :start AND :end
            """)
    List<FloodAlertEntity> findFloodEventByParams(
            @Param("eventTypes") List<String> eventTypes,
            @Param("start") Instant startDate,
            @Param("end") Instant endDate
    );
}
