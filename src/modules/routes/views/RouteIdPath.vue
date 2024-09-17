<template>
    <div ref="mapWrapper" class="map-wrapper" style="width: 100%; height: 100%; overflow: hidden;">
        <d-spin :is-loading="isLoading" />
        <yand-map :style="{width: mapSizes.width, height: mapSizes.height}"
                  style="margin: 0 auto"
                  v-if="!isLoading"
                  :lines="busesRoadMaps"
                  :busStationsMarkers="busStations"
                  :currentBusesCoordinates="busesOnRoute"
                  :center="center"
                  :zoom="zoom"/>
    </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {getLinesByRegion} from "@/modules/map/api";
import YandMap from "@/components/reus/YandMap.vue";
import {BusOnMap, BusRoadMap} from "@/modules/routes/types/Index.ts";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models";
import {transformData} from "@/modules/routes/helpers";
import {getLastPackageWithCoordinates} from "@/modules/routes/api/Index.ts";
import {Dayjs} from "dayjs";
import {DateHelper} from "@/helpers/DateHelper.ts";
import {ParseHelper} from "@/helpers/ParseHelper.ts";
import {getBusGRN} from "@/stores/buses.ts";
import DSpin from "@/components/reus/DSpin.vue";
import {authUser} from "@/stores/user.ts";
import {centerOfRegions} from "@/constants.ts";

const isLoading = ref(false)
const center = ref(centerOfRegions[authUser.value?.REG_ID!] )
const zoom = ref(13)
const direction = ref<0 | 1 | 2>(2)
const busStations = ref<string[]>([])
const busesOnRoute = ref<BusOnMap[]>([])
const outerInterval = ref()
const innerInterval = ref()
const mapWrapper = ref()
const mapSizes = reactive({
    width: '900px',
    height: '650px'
})

const props = defineProps<{
    currentRoute: number
}>()

function setMapSizes() {
    const wrapper = document.querySelector('.map-wrapper')
    mapSizes.width = wrapper?.clientWidth! + 'px'
    mapSizes.height = wrapper?.clientHeight! + 'px'
}

window.addEventListener('resize', setMapSizes)

watch([() => window.innerWidth, () => window.innerHeight], () => {
    setMapSizes()
}, {immediate: true})


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

watch(direction, async () => {
    await buildInnerInterval()
    outerInterval.value = setInterval(async () => {
        await buildInnerInterval()
    }, 20000)
}, {immediate: true})


const currentResponseObject = ref<any[]>([])
let lastResponseObject = <any>[]


function fillCurrentResponseObject(response: any) {
    currentResponseObject.value = getUniqueEmeis(response)

    for (let i = 0; i < currentResponseObject.value.length; i++) {
        const temp = response.filter((r: any) => r.GPS_IMEI === currentResponseObject.value[i].emei)
        currentResponseObject.value[i].packageLastTimeStamp = DateHelper.stringDateToDayjs(temp[temp.length - 1].TimeStamp)
        currentResponseObject.value[i].coords = temp.map((a: any) => ParseHelper.parseCoords(a.RES_GPS))
        currentResponseObject.value[i].direction = +(temp[0].DIRECTION)
    }
}

async function buildInnerInterval() {
    clearInterval(innerInterval.value)
    const response = await getLastPackageWithCoordinates({route: props.currentRoute})
    if (response) {
        fillCurrentResponseObject(response)
        let test = []
        if (lastResponseObject.length) {
            lastResponseObject.forEach((last: any) => {
                const exist = currentResponseObject.value.find(current => current.emei === last.emei)
                if (exist) {
                    if (exist.packageLastTimeStamp.isAfter(last.packageLastTimeStamp)) {
                        test.push(exist)
                    } else {
                        test.push({
                            ...exist,
                            coords: [exist.coords[exist.coords.length - 1]]
                        })
                    }
                }
            })
        } else test = currentResponseObject.value
        let counter = 0
        innerInterval.value = setInterval(() => {
            busesOnRoute.value = test.map(a => {
                return {
                    ...a,
                    coords: a.coords[counter]
                }
            })
            counter++
        }, 1000)
        lastResponseObject = currentResponseObject.value
    }
}

function getUniqueEmeis(data: any): {
    emei: string,
    packageLastTimeStamp: Dayjs | null,
    coords: [],
    direction: number | null
}[] {
    const emeis = data.map((a: any) => a.GPS_IMEI)
    const uniqueEmeis = new Set(emeis)
    const arr = Array.from(uniqueEmeis) as string[]
    return arr.map(a => {
        return {
            emei: a,
            direction: null,
            packageLastTimeStamp: null,
            coords: [],
            GRN: getBusGRN(a)
        }
    })
}

onUnmounted(() => {
    clearInterval(outerInterval.value)
    clearInterval(innerInterval.value)
})

async function getBothLinesByRoute() {
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 1)

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

onMounted(async () => {
    isLoading.value = true
    await getBothLinesByRoute()
    isLoading.value = false
})
</script>
<style scoped>

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
</style>