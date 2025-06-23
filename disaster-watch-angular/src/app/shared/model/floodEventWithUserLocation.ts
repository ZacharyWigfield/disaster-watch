export type FloodEvent = {
    id: number,
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
    lat: number | undefined,
    long: number | undefined
}

export type FloodEventWithUserLocation = {
    floodEvents: FloodEvent[],
    userLat: number,
    userLong: number
}
