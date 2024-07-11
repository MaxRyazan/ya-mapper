import {URL2} from "@/modules/map/api";
import {GetRoutesResponse} from "@/modules/routes/types/api-models.ts";

export async function getAllRoutes(options?:{region: string, bin: string}): Promise<GetRoutesResponse[]> {
    const res: Response = await fetch(`${URL2}?op=Get_ROUTES_BY_BIN&REGION=${options?.region}&BIN=${options?.bin}`)
    if(res) {
        return await res.json()
    }
    else return []
}

export async function getAllBusesLastCoordinateByRouteNum(options:{region: string, route: number}) {
    const res: Response = await fetch(`${URL2}Get_GROUP_BUS_GPS_DATA_OBJ?REGION=${options.region}&ROUTE=${options.route}`)
    if(res) {
        return await res.json()
    }
    else return []
}