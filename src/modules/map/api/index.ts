import {Bus} from "@/models/Bus.ts";

export async function getAllBuses(options?: { bin?: string, region?: string }): Promise<Bus[]> {
    const res: Response = await fetch(`http://localhost:3001/get-buses-json?bin=${options!.bin}&region=${options!.region}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
    else return [] as Bus[]
}

export async function getSingleBusGPSData(options?: { region?: string, route?: string }): Promise<Bus[]> {
    const res: Response = await fetch(`http://localhost:3001/get-single-bus-gps-data?region=${options!.region}&route=${options!.route}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
    else return [] as Bus[]
}

export async function getBusGpsDataJson(options?: {
    emei?: string,
    region?: string,
    date: string,
    time_start: string,
    time_stop: string
}) {
    const res: Response = await fetch(`http://localhost:3001/get-bus-gps-data-json?emei=${options!.emei}&region=${options!.region}&time_start=${options?.time_start}&time_stop=${options?.time_stop}&date=${options?.date}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
}

export async function getRouteXml(options?: {
    route?: string,
    region?: string,
    direction: string,
}){
    const res: Response = await fetch(`http://localhost:3001/get-route-xml?route=${options!.route}&region=${options!.region}&direction=${options?.direction}`)
    const raw: string = await res.text()
    console.log(raw)
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
}

export async function getBusesByRoute(options?: {
    route?: string,
    region?: string,
}){
    const res: Response = await fetch(`http://localhost:3001/get-buses-by-route?route=${options!.route}&region=${options!.region}`)
    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
}


/**
 * Метод получает маршрут с отстановками с параметрами очередности остановок для отрисовки линий на карте
 */
export async function getLinesByRegion(){
    const res: Response = await fetch(`http://localhost:3001/get-lines-by-region`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[{')
    const closeArray: number = raw.indexOf('}]')

    const text: string = raw.slice(openArray, closeArray + 2)
    console.log(text)
    if (text) return await JSON.parse(text)
}
