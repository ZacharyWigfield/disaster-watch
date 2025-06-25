export type FloodEventWithUserLocation = {
    floodEvents: FloodEvent[],
    userLat: number,
    userLong: number
}

export type FloodEvent = {
    id: number,
    areaDesc: string[],
    event: string,
    description: string,
    severity: string,
    certainty: string
    urgency: string,
    effective: string,
    expires: string,
    latitude: number,
    longitude: number,
    polygonGeoJson: GeoJsonPolygon
}

export interface GeoJsonPolygon {
    type: 'Polygon';
    coordinates: [number, number][][];
}

export type UserLocation = {
    lat: number | undefined,
    long: number | undefined
}

