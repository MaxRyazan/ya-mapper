<template>
    <d-flex gap="0" style="position: relative; background-color: rgba(0,0,0, .08);">
        <the-main-nav />
        <default-layout />
    </d-flex>
</template>
<script setup lang="ts">
import {Bus} from "@/models/Bus.ts";
import {getAllBuses} from "@/modules/map/api";
import {allBuses, isAllBusesInLoading} from "@/stores/buses.ts";
import {onMounted} from "vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import TheMainNav from "@/components/single-use/TheMainNav.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import {getRegions} from "@/api-global";
import {MapHelper} from "@/helpers/MapHelper.ts";
import {REGIONS_MAP} from "@/constants.ts";
import {GlobalRegions} from "@/global-types.ts";

onMounted(async () => {
    isAllBusesInLoading.value = true
    const result: Bus[] = await getAllBuses({bin: '10540003043', region: 'REG_18'})
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
    const regions = await getRegions()
    MapHelper.createMapFromObjectArray<GlobalRegions>(REGIONS_MAP, regions, 'REG_ID', 'CITY')
})
</script>
<style scoped>

</style>