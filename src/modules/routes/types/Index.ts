import {Station} from "@/modules/map/types";

export interface BusRoadMap {
    id: number
    roadMap: Station[]
    lineColor: string
}

export interface BusOnMap {
    coord: number[],
    emei: string,
    speed: string | number,
    timestamp: string
    direction: number | null
}

export interface StationOfRoute {
    NAME_RU: string,
    NAME_KZ: string,
    ID: string,
    DIRECTION: string
    KEY: number|null
    DIRECTION_TEXT: string
}