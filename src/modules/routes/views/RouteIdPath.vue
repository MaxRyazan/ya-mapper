<template>
    <div>
        <d-flex gap="0">
            <router-link to="/routes">маршруты</router-link>
            <p>/{{ route.params.id }}</p>
        </d-flex>
        <d-flex style="margin-top: 20px;">
            <d-text class="breadcrumbs"
                    @click="direction = 2" :class="{current: direction === 2}" cursor="pointer">Оба
            </d-text>
            <d-text class="breadcrumbs"
                    @click="isSchema = !isSchema" cursor="pointer">Показать схему
            </d-text>
        </d-flex>
        <d-flex align="start" style="max-height: calc(100vh - 134px); overflow-y: auto" justify="space-between"
                gap="40px">
            <bus-stations-card class="bus__stations"
                               @show-station="changeCenter"
                               :stations="busStations"
                               :direction="direction"/>
            <yand-map style="width: 900px; height: 750px"
                      v-if="isLoaded && !isSchema"
                      :lines="busesRoadMaps"
                      :busStationsMarkers="busStations"
                      :currentBusesCoordinates="busesOnRoute"
                      :center="center"
                      :zoom="zoom"/>
            <div v-if="isSchema" style="display: flex; gap: 10px;  right: 40%">
                <div v-for="item in busStations" :key="item"
                     style="border-radius: 50%; width: 20px;height: 20px;border: 2px solid red;"></div>
            </div>
        </d-flex>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {getLinesByRegion} from "@/modules/map/api";
import YandMap from "@/components/reus/YandMap.vue";
import {BusOnMap, BusRoadMap} from "@/modules/routes/types/Index.ts";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models";
import {transformData} from "@/modules/routes/helpers";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";
import BusStationsCard from "@/modules/routes/views/cards/BusStationsCard.vue";
import {getLastPackageWithCoordinates} from "@/modules/routes/api/Index.ts";
import {Dayjs} from "dayjs";
import {DateHelper} from "@/helpers/DateHelper.ts";
import {ParseHelper} from "@/helpers/ParseHelper.ts";

const isSchema = ref(false)
const isLoaded = ref(false)
const route = useRoute()
const center = ref([63.615375, 53.181536])
const zoom = ref(15)
const direction = ref<0 | 1 | 2>(2)
// const currentBusRoute = +route.params.id
const busStations = ref<string[]>([])
const busesOnRoute = ref<BusOnMap[]>([])
const outerInterval = ref()
const innerInterval = ref()

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

function changeCenter(param: { name: string, direction: 1 | 0 | 2 }) {
    const busRoute = busesRoadMaps.value[direction.value]
    const station = busRoute.roadMap.find(r => r.descRu === param.name)
    if (!station) return
    center.value = [station.coords[0], station.coords[1]]
    zoom.value = 18
}

watch(direction, async () => {
    await buildInnerInterval()
    outerInterval.value = setInterval(async () => {
        await buildInnerInterval()
    }, 20000)
}, {immediate: true})


const currentResponseObject = ref<{emei: string, packageLastTimeStamp: Dayjs|null, coords: [], direction: number|null}[]>([])
let lastResponseObject = <any>[]


async function buildInnerInterval() {
    console.log('outer interval start')
    clearInterval(innerInterval.value)
    const response = await getLastPackageWithCoordinates()
    if(response){
        currentResponseObject.value = getUniqueEmeis(response)
        for(let i = 0; i < currentResponseObject.value.length; i++) {
            const temp = response.filter((r:any) => r.GPS_IMEI === currentResponseObject.value[i].emei)
            currentResponseObject.value[i].packageLastTimeStamp = DateHelper.stringDateToDayjs(temp[temp.length - 1].TimeStamp)
            currentResponseObject.value[i].coords = temp.map((a:any) => ParseHelper.parseCoords(a.RES_GPS))
            currentResponseObject.value[i].direction = +temp[0].DIRECTION
        }
        let counter = 0
        if(currentResponseObject.value[0].packageLastTimeStamp!.isAfter(lastResponseObject[0]?.packageLastTimeStamp)) {
            innerInterval.value = setInterval(() => {
                    busesOnRoute.value = [{
                            coord: currentResponseObject.value[0].coords[counter],
                            emei: currentResponseObject.value[0].emei,
                            speed: '',
                            timestamp: '',
                            direction: currentResponseObject.value[0].direction,
                        }]
                    counter++
            }, 1000)
        }
        lastResponseObject = currentResponseObject.value
    }
}

function getUniqueEmeis(data: any): {emei: string, packageLastTimeStamp: Dayjs|null, coords: [], direction: number|null}[] {
    const emeis = data.map((a:any) => a.GPS_IMEI)
    const uniqueEmeis = new Set(emeis)
    const arr = Array.from(uniqueEmeis) as string[]
    return arr.map(a => {
        return {
            emei: a,
            direction: null,
            packageLastTimeStamp: null,
            coords: []
        }
    })
}

// watch(direction, async () => {
//     busStations.value = []
//     if (direction.value !== 2) {
//         await getLinesByRoute()
//     } else {
//         await getBothLinesByRoute()
//         interval.value = setInterval(async () => {
//             const response = await getAllBusesLastCoordinateByRouteNum({region: 'REG_18', route: +(route.params.id)})
//             busesOnRoute.value = response.map((r: string) => {
//                 const parsed = JSON.parse(r)
//                 return {
//                     coord: ParseHelper.parseCoords(parsed.RES_GPS),
//                     emei: parsed.GPS_IMEI,
//                     speed: +parsed.SPEED,
//                     timestamp: parsed.TimeStamp
//                 }
//             })
//         }, 1000)
//     }
// },{immediate:true})
onUnmounted(() => {
    clearInterval(outerInterval.value)
    clearInterval(innerInterval.value)
})

async function getBothLinesByRoute() {
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, 1)

    if (!ascResponse || !descResponse) return
    const both = [...ascResponse, ...descResponse]
    busStations.value = both.map((r: GetLinesByRouteResponse) => r.NAME_RU)

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

// async function getLinesByRoute() {
//     const linesResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(+route.params.id, direction.value)
//     if (!linesResponse) return
//     busStations.value = linesResponse.map((r: GetLinesByRouteResponse) => r.NAME_RU)
//     const currentRouteLines = linesResponse.filter((r: GetLinesByRouteResponse) => +r.ROUTE_NUM === currentBusRoute)
//     let ASC = currentRouteLines?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 0)
//     let DESC = currentRouteLines?.filter((r: GetLinesByRouteResponse) => +r.DIRECTION === 1)
//     if (ASC) {
//         const res0: any[] = transformData(ASC)
//         busesRoadMaps.value[0].roadMap = res0.map(r => {
//             return {
//                 code: r.ST_ID,
//                 coords: r.LON_LAT,
//                 descRu: r.NAME_RU,
//                 descKz: r.NAME_KZ,
//                 direction: r.DIRECTION,
//                 segments: r.SEGMENTS
//             }
//         })
//         const variable = busesRoadMaps.value[0].roadMap
//         const resArr = []
//
//         for (let i = 0; i < variable.length; i++) {
//             resArr.push(variable[i])
//             if (variable[i].segments) {
//                 variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
//             }
//         }
//         busesRoadMaps.value[0].roadMap = resArr
//     }
//     if (DESC) {
//         const res1: any[] = transformData(DESC)
//         busesRoadMaps.value[1].roadMap = res1.map(r => {
//             return {
//                 code: r.ST_ID,
//                 coords: r.LON_LAT,
//                 descRu: r.NAME_RU,
//                 descKz: r.NAME_KZ,
//                 direction: r.DIRECTION,
//                 segments: r.SEGMENTS
//             }
//         })
//         const variable = busesRoadMaps.value[1].roadMap
//         const resArr = []
//
//         for (let i = 0; i < variable.length; i++) {
//             resArr.push(variable[i])
//             if (variable[i].segments) {
//                 variable[i].segments?.forEach(vS => resArr.push({coords: vS}))
//             }
//         }
//         busesRoadMaps.value[1].roadMap = resArr
//     }
// }

onMounted(async () => {
    await getBothLinesByRoute()
    isLoaded.value = true
})
</script>
<style scoped>
.current {
    background-color: var(--primary-color) !important;
    color: hsla(0, 0%, 22%, .75) !important;
}

.bus__stations {
    padding: 0 10px;
    max-height: calc(100vh - 154px);
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 20px;
    direction: rtl;
}

::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 6px;
}

.breadcrumbs {
    border-radius: 6px;
    background-color: white;
    padding: 4px;
    border: 2px solid hsla(0, 0%, 22%, .75);
    width: 120px;
    text-align: center;
}
</style>