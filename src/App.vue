<template>
    <the-header />
    <div style="display: flex">
        <router-view />
    </div>
</template>
<script setup lang="ts">
import TheHeader from "@/components/single-use/TheHeader.vue";
import {Bus} from "@/models/Bus.ts";
import {getAllBuses} from "@/modules/map/api";
import {allBuses, isAllBusesInLoading} from "@/stores/buses.ts";
import {onMounted} from "vue";

onMounted(async () => {
    isAllBusesInLoading.value = true
    const result: Bus[] = await getAllBuses({bin: '10540003043', region: 'REG_18'})
    const res = result.map(res => {
        return {
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
})
</script>