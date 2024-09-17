import {watch} from "vue";
import {allBuses, isAllBusesInLoading} from "@/stores/buses.ts";
import {Bus} from "@/models/Bus.ts";
import {authUser} from "@/stores/user.ts";
import {REG} from "@/constants.ts";
import {getAllBuses} from "@/modules/map/api";

export async function useGetBuses() {
    watch(allBuses, async () => {
        if(!allBuses.length) {
            if(!isAllBusesInLoading.value) {
                isAllBusesInLoading.value = true
                const result: Bus[] = await getAllBuses({bin: authUser.value?.BIN, region: `REG_${REG.value}`})
                const res = result.map((res, idx) => {
                    return {
                        KEY: idx + 1,
                        ID: res.ID,
                        GOS_NUM: res.GOS_NUM,
                        TAR_CITY: res.TAR_CITY,
                        ZONES: res.ZONES,
                        TAR_BEZ: res.TAR_BEZ,
                        TAR_CASH: res.TAR_CASH,
                        ROUTE: res.ROUTE,
                        SMENA: res.SMENA,
                        STATUS: (res.STATUS === 'True' ? 'Рабочий' : 'Не рабочий'),
                        GPS_IMEI: res.GPS_IMEI,
                    }
                })
                Object.assign(allBuses, res)
                isAllBusesInLoading.value = false
            }
        }
    }, {immediate: true})
}