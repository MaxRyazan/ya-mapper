import {reactive, ref} from "vue";
import {Bus} from "@/models/Bus.ts";

export let allBuses = reactive<Bus[]>([])
export const isAllBusesInLoading = ref(false)

export function getBusGRN(bin: string|null) {
    console.log(allBuses)
    const res =  allBuses.find(b => b.GPS_IMEI === bin)
    return res?.GOS_NUM
}