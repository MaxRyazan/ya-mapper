import {GetLinesByRouteResponse} from "@/modules/map/types/api-models";

export function deleteRN(p: string) {
    return p.replace('\r', '').replace('\n', '')
}

export function clearLatLon(p: string) {
    const res = deleteRN(p).split(',')
    if (res.length !== 2) return []
    const arr = res.map(r => +(r.trim()))
    return [arr[1], arr[0]]
}

export function clearSegments(p: string) {
    if (!p.length) return
    const segments = p.split('!')
    const coordinates = segments[1].split(':')
    const res = coordinates.map(a => a.replace('[', '').replace(']', ''))
    return res.map(r => clearLatLon(r))
}

export function transformData(p: GetLinesByRouteResponse[]) {
    return p.map((a: GetLinesByRouteResponse) => {
        return {
            DIRECTION: +a.DIRECTION,
            LON_LAT: clearLatLon(a.LON_LAT),
            NAME_KZ: deleteRN(a.NAME_KZ),
            NAME_RU: deleteRN(a.NAME_RU),
            NUM_IN_ROUTE: +a.NUM_IN_ROUTE,
            ROUTE_NUM: +a.ROUTE_NUM,
            ST_ID: +a.ST_ID,
            SEGMENTS: clearSegments(a.SEGMENTS) ?? []
        }
    })
}