export type FloodEvent = {
    id: string,
    areaDesc: string[],
    event: string,
    description: string,
    severity: string,
    certainty: string
    urgency: string,
    effective: Date,
    expires: Date
    latitude: number,
    longitude: number
}

export type UserLocation = {
    lat: number,
    long: number
}

export type FloodEventWithUserLocation = {
    floodEvents: FloodEvent[],
    userLat: number,
    userLong: number
}
