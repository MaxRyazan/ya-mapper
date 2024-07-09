import {URL2} from "@/modules/map/api";
import {GetRoutesResponse} from "@/modules/routes/types/api-models.ts";

export async function getAllRoutes(options?:{region: string, bin: string}): Promise<GetRoutesResponse[]> {
    const res: Response = await fetch(`${URL2}?op=Get_ROUTES_BY_BIN&REGION=${options?.region}&BIN=${options?.bin}`)
    if(res) {
        return await res.json()
    }
    else return []
}