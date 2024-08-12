<template>
    <d-flex gap="0" justify="start" align="start" style="height: 100vh; max-height: 100vh; position: relative;">
        <the-main-nav />
        <d-flex type="column" style="width: 100%; height: 100%;">
            <the-header v-if="!publicRoutes.includes(route.path)"/>
            <d-flex class="content-wrapper">
                <default-layout />
            </d-flex>
        </d-flex>
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
import TheHeader from "@/components/single-use/TheHeader.vue";
import {useRoute} from "vue-router";

const publicRoutes = ['/', '/login', '/registration']
const route = useRoute()
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
})
</script>
<style scoped>
.content-wrapper {
    max-width: 100%;
    width: 100%;
    overflow: hidden;
}
</style>