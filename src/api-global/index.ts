import {GlobalRegions} from "@/global-types.ts";

export async function getRegions(): Promise<GlobalRegions[]> {
    try {
        const response = await fetch('https://www.asts.kz:5554/api/ROUTES/Get_REGIONS')
        return await response.json()
    } catch (e) {
        console.log(e)
        return []
    }
}