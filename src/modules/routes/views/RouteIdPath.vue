<template>
	<d-flex gap="0">
		<router-link to="/routes">маршруты</router-link>
		<p>/{{ route.params.id }}</p>
    </d-flex>
	<d-flex style="margin-top: 20px;">
        <d-text @click="direction = 0" :class="{current: direction === 0}" cursor="pointer">Прямой</d-text>
        <d-text @click="direction = 1" :class="{current: direction === 1}" cursor="pointer">Обратный</d-text>
    </d-flex>
	<yand-map style="width: 900px; height: 800px"
						v-if="isLoaded"
						:lines="busesRoadMaps"
						:center="center" :zoom="15"/>
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

const isLoaded = ref(false)
const route = useRoute()
const center = ref([63.615375, 53.181536])
const direction = ref<0|1>(0)
const currentBusRoute = +route.params.id

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

watch(direction, () => getLinesByRoute())

async function getLinesByRoute() {
	const linesResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, direction.value)
	if (!linesResponse) return
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
	color: blue
}
</style>