<template>
    <d-flex gap="0" justify="start" align="start" style="overflow: hidden; height: 100vh; max-height: 100vh; max-width: 100vw; position: relative; background: rgba(0,0,0, .08);">
        <the-main-nav />
        <d-flex gap="20px" type="column" style="width: 100%; height: 100%;">
            <the-header v-if="!publicRoutes.includes(route.path)"/>
            <d-flex style="flex-grow: 1" class="content-wrapper">
                <default-layout />
            </d-flex>
            <the-footer v-if="!publicRoutes.includes(route.path)"/>
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
import TheFooter from "@/components/single-use/TheFooter.vue";

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
    width: 96%;
    overflow: hidden;
    background: white;
    border-radius: 8px;
}
</style>