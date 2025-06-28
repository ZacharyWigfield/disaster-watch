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


public interface FloodAlertRepository extends JpaRepository<FloodAlertEntity, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM FloodAlertEntity f WHERE f.effective < :cutoff")
    int deleteByEffectiveBefore(Instant cutoff);

    @Query("SELECT new com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO(f) FROM FloodAlertEntity f")
    List<FloodAlertDTO> findAllFloodEventsAsDto();

    @Query("""
            SELECT new com.zewigfield.disaster_watch.model.DTO.FloodAlertDTO(f)
            FROM FloodAlertEntity f
            WHERE f.id = :eventId
            """)
    Optional<FloodAlertDTO> findFloodEventDtoById(@Param("eventId") Long eventId);

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

    // uses native SQL over JPQL to make use of PostGIS functions
    @Query(value = """
            SELECT id
            FROM flood_alerts
            WHERE ST_Intersects(
                  flood_area,
                  (SELECT flood_area FROM flood_alerts WHERE id = :eventId)
                  )
            AND effective > NOW() - INTERVAL '1 year'
            """, nativeQuery = true)
    List<Long> findIntersectingEventsWithinLastYear(@Param("eventId") Long eventId);
}
