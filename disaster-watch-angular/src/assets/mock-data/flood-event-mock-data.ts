import { FloodEvent } from "../../app/shared/model/floodEventWithUserLocation";

export const mockFloodEvents: FloodEvent[] = [
    {
        id: 510,
        areaDesc: ["Angelina, TX",],
        event: "Flood Warning",
        description: "...The Flood Warning ",
        certainty: "Observed",
        severity: "Severe",
        urgency: "Immediate",
        effective: "2025-07-02T13:22:00Z",
        expires: "2025-07-03T15:00:00Z",
        latitude: 31.54,
        longitude: -94.84,
        userToEventDistance: 142.84214825297852,
        polygonGeoJson: {
            coordinates: [[[-94.84, 31.54], [-94.72, 31.47],]],
            type: "Polygon"
        }
    },
    {
        id: 511,
        areaDesc: ["Angelina, TX",],
        event: "Flood Warning",
        description: "...The Flood Warning ",
        certainty: "Observed",
        severity: "Severe",
        urgency: "Immediate",
        effective: "2025-07-02T13:22:00Z",
        expires: "2025-07-03T15:00:00Z",
        latitude: 31.54,
        longitude: -94.84,
        userToEventDistance: 142.84214825297852,
        polygonGeoJson: {
            coordinates: [[[-94.84, 31.54], [-94.72, 31.47],]],
            type: "Polygon"
        }
    },
    {
        id: 512,
        areaDesc: ["Angelina, TX",],
        event: "Flood Warning",
        description: "...The Flood Warning ",
        certainty: "Observed",
        severity: "Severe",
        urgency: "Immediate",
        effective: "2025-07-02T13:22:00Z",
        expires: "2025-07-03T15:00:00Z",
        latitude: 31.54,
        longitude: -94.84,
        userToEventDistance: 142.84214825297852,
        polygonGeoJson: {
            coordinates: [[[-94.84, 31.54], [-94.72, 31.47],]],
            type: "Polygon"
        }
    },

]

export const mockSingleFloodEvent: FloodEvent = {
    id: 510,
    areaDesc: ["Angelina, TX",],
    event: "Flood Warning",
    description: "...The Flood Warning ",
    certainty: "Observed",
    severity: "Severe",
    urgency: "Immediate",
    effective: "2025-07-02T13:22:00Z",
    expires: "2025-07-03T15:00:00Z",
    latitude: 31.54,
    longitude: -94.84,
    userToEventDistance: 142.84214825297852,
    polygonGeoJson: {
        coordinates: [[[-94.84, 31.54], [-94.72, 31.47],]],
        type: "Polygon"
    }
}

export const mockSingleFloodEventNoPolygon: FloodEvent = {
    id: 510,
    areaDesc: ["Angelina, TX",],
    event: "Flood Warning",
    description: "...The Flood Warning ",
    certainty: "Observed",
    severity: "Severe",
    urgency: "Immediate",
    effective: "2025-07-02T13:22:00Z",
    expires: "2025-07-03T15:00:00Z",
    latitude: 31.54,
    longitude: -94.84,
    userToEventDistance: 142.84214825297852,
    polygonGeoJson: {
        coordinates: [],
        type: "LineString"
    }
}
