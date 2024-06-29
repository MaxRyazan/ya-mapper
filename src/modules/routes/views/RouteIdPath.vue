<template>
    <div style="display: flex">
        <router-link to="/routes">маршруты</router-link>
        <p>/{{ route.params.id }}</p>
    </div>
    <yand-map style="width: 900px; height: 800px"
              v-if="isLoaded"
              :lines="busesRoadMaps"
              :center="center" :zoom="15"/>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getLinesByRegion} from "@/modules/map/api";
import YandMap from "@/components/reus/YandMap.vue";
import {BusRoadMap} from "@/modules/routes/types/Index.ts";
import {GetLinesResponse} from "@/modules/routes/types/apiModels.ts";

const isLoaded = ref(false)
const route = useRoute()
const center = ref([63.615375, 53.181536])
const currentBusRoute = route.params.id
const busesRoadMaps = ref<BusRoadMap[]>([
    {
        id: 0,
        roadMap: [],
        lineColor: 'red'
    },
    {
        id: 1,
        roadMap: [],
        lineColor: 'blue'
    }
])

function deleteRN(p: string) {
    return p.replace('\r', '').replace('\n', '')
}

function clearLatLon(p: string) {
    const res = deleteRN(p).split(',')
    const arr = res.map(r => +(r.trim()))
    return [arr[1], arr[0]]
}

function clearSegments(p: string) {
    if (!p.length) return
    const segments = p.split('!')
    const coordinates = segments[1].split(':')
    const res = coordinates.map(a => a.replace('[', '').replace(']', ''))
    return res.map(r => clearLatLon(r))
}

function transformData(p: GetLinesResponse[]) {
    return p.map((a: GetLinesResponse) => {
        return {
            DIRECTION: +a.DIRECTION,
            LON_LAT: clearLatLon(a.LON_LAT),
            NAME_KZ: deleteRN(a.NAME_KZ),
            NAME_RU: deleteRN(a.NAME_RU),
            NUM_IN_ROUTE: +a.NUM_IN_ROUTE,
            ROUTE_NUM: +a.ROUTE_NUM,
            ST_ID: +a.ST_ID,
            SEGMENTS: clearSegments(a.SEGMENTS) ?? []
        }
    })
}

onMounted(async () => {
    const linesResponse = await getLinesByRegion()
    const currentRouteLines = linesResponse?.filter(r => +r.ROUTE_NUM === +currentBusRoute)
    let ASC = currentRouteLines?.filter((r: GetLinesResponse) => +r.DIRECTION === 0)
    let DESC = currentRouteLines?.filter((r: GetLinesResponse) => +r.DIRECTION === 1)
    if (ASC) {
        const res0: any[] = transformData(ASC)
        busesRoadMaps.value[0].roadMap = res0.map(r => {
            return {
                code: r.ST_ID,
                coords: r.LON_LAT,
                descRu: r.NAME_RU,
                descKz: r.NAME_KZ,
                direction: r.DIRECTION
            }
        })
    }
        if (DESC) {
            const res1: any[] = transformData(DESC)
            busesRoadMaps.value[1].roadMap = res1.map(r => {
                return {
                    code: r.ST_ID,
                    coords: r.LON_LAT,
                    descRu: r.NAME_RU,
                    descKz: r.NAME_KZ,
                    direction: r.DIRECTION
                }
            })
        }


isLoaded.value = true
})
</script>
<style scoped>

</style>