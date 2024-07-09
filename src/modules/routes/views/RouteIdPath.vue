<template>
	<d-flex gap="0">
		<router-link to="/routes">маршруты</router-link>
		<p>/{{ route.params.id }}</p>
    </d-flex>
	<d-flex style="margin-top: 20px;">
        <d-text @click="direction = 0" :class="{current: direction === 0}" cursor="pointer">Прямой</d-text>
        <d-text @click="direction = 1" :class="{current: direction === 1}" cursor="pointer">Обратный</d-text>
        <d-text @click="direction = 2" :class="{current: direction === 2}" cursor="pointer">Оба</d-text>
    </d-flex>
    <d-flex gap="40px">
        <bus-stations-card @show-station="changeCenter" :stations="busStations" :direction="direction"/>
        <yand-map style="width: 900px; height: 800px"
                            v-if="isLoaded"
                            :lines="busesRoadMaps"
                            :center="center" :zoom="zoom"/>
    </d-flex>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {getLinesByRegion} from "@/modules/map/api";
import YandMap from "@/components/reus/YandMap.vue";
import {BusRoadMap} from "@/modules/routes/types/Index.ts";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models";
import {transformData} from "@/modules/routes/helpers";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";
import BusStationsCard from "@/modules/routes/views/cards/BusStationsCard.vue";

const isLoaded = ref(false)
const route = useRoute()
const center = ref([63.615375, 53.181536])
const zoom = ref(15)
const direction = ref<0|1|2>(0)
const currentBusRoute = +route.params.id
const busStations = ref<string[]>([])

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

function changeCenter(param: {name: string, direction: 1|0}){
    const busRoute = busesRoadMaps.value[direction.value]
    const station = busRoute.roadMap.find(r => r.descRu === param.name)
    if(!station) return
    center.value = [station.coords[0], station.coords[1]]
    zoom.value = 18

}

watch(direction, () => {
    if(direction.value !== 2) {
        getLinesByRoute()
    } else getBothLinesByRoute()
})

async function getBothLinesByRoute() {
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, 1)

    if(!ascResponse || !descResponse) return
    const both = [...ascResponse, ...descResponse]
    busStations.value = both.map((r:GetLinesByRouteResponse) => r.NAME_RU)

    let ASC = both?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 0)
    let DESC = both?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 1)
    if (ASC) {
        const res0: any[] = transformData(ASC)
        busesRoadMaps.value[0].roadMap = res0.map(r => {
            return {
                code: r.ST_ID,
                coords: r.LON_LAT,
                descRu: r.NAME_RU,
                descKz: r.NAME_KZ,
                direction: r.DIRECTION,
                segments: r.SEGMENTS
            }
        })
        const variable = busesRoadMaps.value[0].roadMap
        const resArr = []

        for (let i = 0; i < variable.length; i++) {
            resArr.push(variable[i])
            if (variable[i].segments) {
                variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
            }
        }
        busesRoadMaps.value[0].roadMap = resArr
    }
    if (DESC) {
        const res1: any[] = transformData(DESC)
        busesRoadMaps.value[1].roadMap = res1.map(r => {
            return {
                code: r.ST_ID,
                coords: r.LON_LAT,
                descRu: r.NAME_RU,
                descKz: r.NAME_KZ,
                direction: r.DIRECTION,
                segments: r.SEGMENTS
            }
        })
        const variable = busesRoadMaps.value[1].roadMap
        const resArr = []

        for (let i = 0; i < variable.length; i++) {
            resArr.push(variable[i])
            if (variable[i].segments) {
                variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
            }
        }
        busesRoadMaps.value[1].roadMap = resArr
    }
}

async function getLinesByRoute() {
	const linesResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, direction.value)
	if (!linesResponse) return
    busStations.value = linesResponse.map((r:GetLinesByRouteResponse) => r.NAME_RU)
	const currentRouteLines = linesResponse.filter((r: GetLinesByRouteResponse) => +r.ROUTE_NUM === currentBusRoute)
	let ASC = currentRouteLines?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 0)
	let DESC = currentRouteLines?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 1)
	if (ASC) {
		const res0: any[] = transformData(ASC)
		busesRoadMaps.value[0].roadMap = res0.map(r => {
			return {
				code: r.ST_ID,
				coords: r.LON_LAT,
				descRu: r.NAME_RU,
				descKz: r.NAME_KZ,
				direction: r.DIRECTION,
				segments: r.SEGMENTS
			}
		})
		const variable = busesRoadMaps.value[0].roadMap
		const resArr = []

		for (let i = 0; i < variable.length; i++) {
			resArr.push(variable[i])
			if (variable[i].segments) {
				variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
			}
		}
		busesRoadMaps.value[0].roadMap = resArr
	}
	if (DESC) {
		const res1: any[] = transformData(DESC)
		busesRoadMaps.value[1].roadMap = res1.map(r => {
			return {
				code: r.ST_ID,
				coords: r.LON_LAT,
				descRu: r.NAME_RU,
				descKz: r.NAME_KZ,
				direction: r.DIRECTION,
				segments: r.SEGMENTS
			}
		})
		const variable = busesRoadMaps.value[1].roadMap
		const resArr = []

		for (let i = 0; i < variable.length; i++) {
			resArr.push(variable[i])
			if (variable[i].segments) {
				variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
			}
		}
		busesRoadMaps.value[1].roadMap = resArr
	}
}

onMounted(async () => {
	await getLinesByRoute()
	isLoaded.value = true
})
</script>
<style scoped>
.current {
	color: blue !important;
}
</style>