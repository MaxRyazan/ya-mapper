import {Station} from "@/modules/map/types";

export interface BusRoadMap {
    id: number
    roadMap: Station[]
    lineColor: string
}

export interface BusOnMap {
    coord: number[],
    emei: string,
    speed: string|number,
    timestamp: string
}