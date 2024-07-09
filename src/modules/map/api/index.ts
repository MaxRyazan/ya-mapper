import {Bus} from "@/models/Bus.ts";
import {GetLinesByRouteResponse, GetSingleBusCoordinates} from "@/modules/map/types/api-models.ts";

const PORT = 5553
export const URL = 'https://www.asts.kz:5554/api/test/'
export const URL2 = 'https://www.asts.kz:5554/api/Routes/'

export async function getAllBuses(options?: { bin?: string, region?: string }): Promise<Bus[]> {
    const res: Response = await fetch(`${URL}?op=Get_BUSES&bin=${options!.bin}&region=${options!.region}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
    else return [] as Bus[]
}


export async function getSingleBusGPSData(options: { region: string, emei: string, date: string, TIME_Start: string, TIME_Stop: string }): Promise<GetSingleBusCoordinates[]> {
    const res: Response = await fetch(`${URL}?op=Get_SINGLE_BUS_GPS_DATA&REGION=${options.region}&IMEI=${options.emei}&DATE=${options.date}&TIME_Start=${options.TIME_Start}&TIME_Stop=${options.TIME_Stop}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
    else return [] as GetSingleBusCoordinates[]
}

/**
 * Получаем координаты автобуса в промежуток времени
 * @param options
 */
export async function getBusGpsDataJson(options?: {
    emei?: string,
    region?: string,
    date: string,
    time_start: string,
    time_stop: string
}) {
    const res: Response = await fetch(`http://localhost:${PORT}/get-bus-gps-data-json?emei=${options!.emei}&region=${options!.region}&time_start=${options?.time_start}&time_stop=${options?.time_stop}&date=${options?.date}`)

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
}) {
    const res: Response = await fetch(`http://localhost:${PORT}/get-route-xml?route=${options!.route}&region=${options!.region}&direction=${options?.direction}`)
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
}) {
    const res: Response = await fetch(`http://localhost:${PORT}/get-buses-by-route?route=${options!.route}&region=${options!.region}`)
    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
}


/**
 * Метод получает маршрут с отстановками с параметрами очередности остановок для отрисовки линий на карте
 */
export async function getLinesByRegion(num: number, direction: 0 | 1 | 2): Promise<GetLinesByRouteResponse[] | undefined> {
    const res: Response = await fetch(`${URL}?op=Get_ROUTE&REGION=REG_18&NUM=${num}&DIRECTION=${direction}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[{')
    const closeArray: number = raw.indexOf('}]')

    const text: string = raw.slice(openArray, closeArray + 2)
    if (text) return await JSON.parse(text)
}


export async function getGroupBusGPSDataJson(options?: {
    route?: string,
    region?: string,
}) {
    const res: Response = await fetch(`http://localhost:${PORT}/get-group-bus-gps-data-json?route=${options!.route}&region=${options!.region}`)

    const raw: string = await res.text()
    const openArray: number = raw.indexOf('[')
    const closeArray: number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if (text) return await JSON.parse(text)
}
