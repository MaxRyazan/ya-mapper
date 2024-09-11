import {REG} from "@/constants.ts";

export async function getAllBusesOfRouteInContextOfStations(options: {route: number, direction: 0|1}) {
    try {
        const resp = await fetch(`https://www.asts.kz:5554/api/linear/Get_GROUP_BUS_GPS_DATA_LINEAR?ROUTE=${options.route}&REGION=REG_${REG.value}&DIRECTION=${options.direction}`)
        return await resp.json()
    } catch (e) {
        console.log(e)
        return []
    }
}