export interface GetLinesByRouteResponse {
    ROUTE_NUM: string,
    NUM_IN_ROUTE: string,
    ST_ID: string,
    ST_ID_SMSBUS: string,
    LON_LAT: string,
    NAME_RU: string
    NAME_KZ: string
    DIRECTION: string,
    ROUTES: string
    SEGMENTS: string
}

export interface GetSingleBusCoordinates {
    GPS_IMEI: string
    RES_GPS:string
    SPEED: string
    TimeStamp: string
}