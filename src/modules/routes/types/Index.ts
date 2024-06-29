import {Station} from "@/modules/map/types";

export interface BusRoadMap {
    id: number
    roadMap: Station[]
    lineColor: string
}