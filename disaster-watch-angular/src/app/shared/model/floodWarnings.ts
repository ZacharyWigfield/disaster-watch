export type FloodWarnings = {
    id: string,
    areaDesc: string[],
    event: string,
    description: string,
    severity: string,
    certainty: string
    urgency: string,
    effective: Date,
    expires: Date
    lat: number,
    long: number
}