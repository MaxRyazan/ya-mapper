<template>
    <d-flex type="column" gap="200px" style="height: calc(100vh - 430px); margin-top: 40px; justify-content: space-between">
        <d-flex justify="space-between" align="start" gap="30px" style="width: 100%; padding: 0 40px 0 20px; position: relative">
            <div class="line__schema"></div>
            <linear-item v-for="station in ascBusStations" :key="station.ID" :station="station"/>
        </d-flex>
        <d-flex justify="space-between" align="start" gap="30px" style="width: 100%; padding: 0 40px 0 20px; position: relative">
            <div class="line__schema"></div>
            <linear-item v-for="station in descBusStations" :key="station.ID" :station="station"/>
        </d-flex>
    </d-flex>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models.ts";
import {getLinesByRegion} from "@/modules/map/api";
import LinearItem from "@/modules/dispatch/views/LinearItem.vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
const route = useRoute()

const currentRoute = ref()
let ascBusStations = ref<any>([])
let descBusStations = ref<any>([])

onMounted(async () => {
    currentRoute.value = route.query.route
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+currentRoute.value, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+currentRoute.value, 1)

    if(ascResponse){
        ascBusStations.value = ascResponse.map((r: GetLinesByRouteResponse) => {
            return {
                KEY: null,
                NAME_RU: r.NAME_RU,
                NAME_KZ: r.NAME_KZ,
                ID: r.ST_ID,
                DIRECTION: r.DIRECTION,
                DIRECTION_TEXT: 'Прямое'
            }
        })
        ascBusStations.value.forEach((d, idx) => d.KEY = idx+1)
    }
    if(descResponse) {
        descBusStations.value = descResponse.map((r: GetLinesByRouteResponse) => {
            return {
                KEY: null,
                NAME_RU: r.NAME_RU,
                NAME_KZ: r.NAME_KZ,
                ID: r.ST_ID,
                DIRECTION: r.DIRECTION,
                DIRECTION_TEXT: 'Обратное'
            }
        })
        descBusStations.value.forEach((d, idx) => d.KEY = idx+1)
    }
})
</script>


<style scoped>
.line__schema {
    position: absolute;
    top: calc(50% + 4px);
    height: 2px;
    width: calc(100% - 70px);
    background-color: var(--primary-color);
}
</style>