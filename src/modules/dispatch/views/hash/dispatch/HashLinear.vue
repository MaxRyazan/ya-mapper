<template>
    <div style="width: 100%;height: 100%; position: relative">
        <d-flex v-if="!isLoading" type="column" gap="200px" justify="space-between" style="overflow: hidden; height: 100%; padding-bottom: 250px;">
            <d-flex justify="space-between" align="start" gap="30px" style="width: 100%; padding: 0 40px 0 20px; position: relative">
                <div class="line__schema"></div>
                <linear-item :show-bus-icon="showBus(station)"
                             v-for="station in ascBusStations"
                             :key="station.ID"
                             :station="station"/>
            </d-flex>
            <d-flex justify="space-between" align="start" gap="30px" style="width: 100%; padding: 0 40px 0 20px; position: relative">
                <div class="line__schema"></div>
                <linear-item :show-bus-icon="showBus(station)"
                             v-for="station in descBusStations"
                             :key="station.ID"
                             :station="station"/>
            </d-flex>
        </d-flex>
        <a-spin style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)" v-else size="large">
            <template #tip>Идёт загрузка...</template>
        </a-spin>
    </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models.ts";
import {getLinesByRegion} from "@/modules/map/api";
import LinearItem from "@/modules/dispatch/views/LinearItem.vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {getAllBusesOfRouteInContextOfStations} from "@/modules/dispatch/api";

const props = defineProps<{
    currentRoute: number
}>()
const isLoading = ref(false)
let ascBusStations = ref<any>([])
let descBusStations = ref<any>([])
const basesInContextOfStations = ref<any>([])
const interval = ref<any>(null)

onMounted(async () => {
    isLoading.value = true
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 1)
    isLoading.value = false

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
        ascBusStations.value.forEach((d:any, idx:any) => d.KEY = idx+1)
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
        descBusStations.value.forEach((d:any, idx:any) => d.KEY = idx+1)
    }
    await setBusesOnLinearView()
    interval.value = setInterval(async () => {
        await setBusesOnLinearView()
    }, 5000)
})

onUnmounted(() => {
    clearInterval(interval.value)
})

async function setBusesOnLinearView(){
    const resp = await getAllBusesOfRouteInContextOfStations({route: props.currentRoute, direction: 0})
    const resp2 = await getAllBusesOfRouteInContextOfStations({route: props.currentRoute, direction: 1})
    basesInContextOfStations.value = [...resp.Imei, ...resp2.Imei]
    console.log(basesInContextOfStations.value)
}

function showBus(station: any) {
    const exist =  basesInContextOfStations.value.find((a:any) => a.STATION1 === station.ID)
    return {
        visible: !!exist ?? false,
        GRN: exist?.GRN
    }
}
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