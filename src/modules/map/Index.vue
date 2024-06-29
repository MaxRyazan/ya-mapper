<template>
    <div style="display: flex; justify-content: space-between">
        <div class="all_buses">
            <bus-card @select-bus="selectBus"
                      :is-this-bus-selected="selectedBus?.busNumber === bus.busNumber"
                      :bus="bus" v-for="bus in BUSES_ROUTES" :key="bus.busNumber"/>
        </div>
        <button @click="console.log(lastCoordinate)" style="width: 100px;height: 30px; background-color: blue; color: white">Жмахни</button>
        <yand-map style="width: 900px; height: 800px"
                  :lines="busesRoadMaps"
                  :line-color="lineColor"
                  :bus-last-coordinate="lastCoordinate"
                  :center="[63.615375, 53.181536]" :zoom="15"/>
    </div>
</template>

<script setup lang="ts">
import YandMap from "@/components/reus/YandMap.vue";
import {onMounted, reactive, ref} from "vue";
import {BusRoutes} from "@/modules/map/types";
import BusCard from "@/modules/map/BusCard.vue";
import {
    getBusesByRoute,
    getBusGpsDataJson,
    getLinesByRegion,
    getRouteXml,
    getSingleBusGPSData
} from "@/modules/map/api";
import {DateHelper} from "@/helpers/DateHelper.ts";
import {CONSTANTS} from "@/constants.ts";



const lastCoordinate = ref<number[]>([])
const lineColor = ref('red')
let busRoadMap = ref<any>([])
const selectedBus = ref<BusRoutes | null>(null)


const BUSES_ROUTES = reactive<BusRoutes[]>([
    {
        busNumber: '24',
        directions: {
            asc: [
                {code: 1, direction: 0, coords: [53.181470, 63.618944], descRu: 'Детская областная больница', descKz: ''},
                {code: 2, direction: 0, coords: [53.178503, 63.617023], descRu: 'ЦОН', descKz: ''},
                {code: 0, direction: 0, coords: [53.177603, 63.616471], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.176878, 63.615951], descRu: '', descKz: ''},
                {code: 3, direction: 0, coords: [53.176789, 63.615830], descRu: 'Глазная больница', descKz: ''},
                {code: 0, direction: 0, coords: [53.176640, 63.615731], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.176506, 63.615698], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.175609, 63.615051], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174990, 63.614544], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174712, 63.614237], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174416, 63.613686], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174332, 63.613490], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174260, 63.613231], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174279, 63.613032], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174303, 63.612945], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.174922, 63.611059], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.175006, 63.610943], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.175172, 63.610476], descRu: 'Волынова', descKz: ''},
                {code: 0, direction: 0, coords: [53.176022, 63.607870], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.176425, 63.608201], descRu: 'Бахыт', descKz: ''},
                {code: 0, direction: 0, coords: [53.178790, 63.610333], descRu: '25-й Магазин', descKz: ''},
                {code: 0, direction: 0, coords: [53.181538, 63.612350], descRu: 'Областная детская больница', descKz: ''},
                {code: 0, direction: 0, coords: [53.182328, 63.612906], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.182643, 63.613048], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.185780, 63.615375], descRu: 'Университет', descKz: ''},
                {code: 0, direction: 0, coords: [53.186178, 63.615617], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.186786, 63.616075], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.188100, 63.617051], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.188353, 63.617214], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.188863, 63.617443], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.188988, 63.617490], descRu: ' ', descKz: ''},
                {code: 0, direction: 0, coords: [53.189376, 63.617635], descRu: 'Гаражи', descKz: ''},
                {code: 0, direction: 0, coords: [53.190172, 63.617706], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.191106, 63.617902], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.191309, 63.618017], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.191481, 63.618151], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.193423, 63.620331], descRu: 'По требованию', descKz: ''},
                {code: 0, direction: 0, coords: [53.196034, 63.622700], descRu: 'Хакимжанова', descKz: ''},
                {code: 0, direction: 0, coords: [53.197272, 63.623856], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.197412, 63.624010], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.197601, 63.624280], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.199214, 63.626567], descRu: 'Наримановский рынок', descKz: ''},
                {code: 0, direction: 0, coords: [53.199608, 63.627175], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.198980, 63.628553], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.199027, 63.628838], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.199852, 63.629952], descRu: 'Фролова', descKz: ''},
                {code: 0, direction: 0, coords: [53.202696, 63.633859], descRu: 'Абиль сай', descKz: ''},
                {code: 0, direction: 0, coords: [53.203249, 63.634579], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.203504, 63.634009], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.203618, 63.633773], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.204034, 63.633356], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.204471, 63.634616], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.207540, 63.639148], descRu: 'Гоголя', descKz: ''},
                {code: 0, direction: 0, coords: [53.209444, 63.641875], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.210210, 63.640320], descRu: 'Колос', descKz: ''},
                {code: 0, direction: 0, coords: [53.211248, 63.638399], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.212607, 63.640319], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.213861, 63.637826], descRu: 'Казахтелеком', descKz: ''},
                {code: 0, direction: 0, coords: [53.216653, 63.632389], descRu: 'Гостиница', descKz: ''},
                {code: 0, direction: 0, coords: [53.218853, 63.628117], descRu: 'ЦОН', descKz: ''},
                {code: 0, direction: 0, coords: [53.221258, 63.623373], descRu: 'Дворец спорта', descKz: ''},
                {code: 0, direction: 0, coords: [53.223906, 63.618167], descRu: 'Форте банк', descKz: ''},
                {code: 0, direction: 0, coords: [53.225352, 63.615350], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.224089, 63.613469], descRu: '', descKz: ''},
                {code: 0, direction: 0, coords: [53.224439, 63.612664], descRu: 'Магазин "Радуга', descKz: ''},
                {code: 0, direction: 0, coords: [53.226861, 63.607931], descRu: 'ЖД вокзал', descKz: ''},
            ],
            desc: [
                {code: 0, direction: 1, coords: [53.226076, 63.607810], descRu: 'ЖД вокзал', descKz: ''},
                {code: 0, direction: 1, coords: [53.226456, 63.608511], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.224301, 63.612704], descRu: 'Магазин "Радуга', descKz: ''},
                {code: 0, direction: 1, coords: [53.223909, 63.613481], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.225226, 63.615334], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.223768, 63.618256], descRu: 'Форте банк', descKz: ''},
                {code: 0, direction: 1, coords: [53.220387, 63.624887], descRu: 'Дворец спорта', descKz: ''},
                {code: 0, direction: 1, coords: [53.218432, 63.628701], descRu: 'ЦОН', descKz: ''},
                {code: 0, direction: 1, coords: [53.213783, 63.637793], descRu: 'Казахтелеком', descKz: ''},
                {code: 0, direction: 1, coords: [53.212618, 63.639972], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.211226, 63.638076], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.209993, 63.640515], descRu: 'Казахтелеком', descKz: ''},
                {code: 0, direction: 1, coords: [53.209418, 63.641587], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.207275, 63.638510], descRu: 'Гоголя', descKz: ''},
                {code: 0, direction: 1, coords: [53.204529, 63.634546], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.204104, 63.633163], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.203589, 63.633675], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.203470, 63.633931], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.203258, 63.634371], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.202741, 63.633754], descRu: 'Абиль сай', descKz: ''},
                {code: 0, direction: 1, coords: [53.199781, 63.629731], descRu: 'Фролова', descKz: ''},
                {code: 0, direction: 1, coords: [53.199123, 63.628834], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.199073, 63.628705], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.199077, 63.628547], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.199738, 63.627080], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.199393, 63.626625], descRu: 'Наримановский рынок', descKz: ''},
                {code: 0, direction: 1, coords: [53.197518, 63.623970], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.196710, 63.623181], descRu: 'Хакимжанова', descKz: ''},
                {code: 0, direction: 1, coords: [53.194085, 63.620729], descRu: 'По требованию', descKz: ''},
                {code: 0, direction: 1, coords: [53.191399, 63.617943], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.190828, 63.617616], descRu: 'Гаражи', descKz: ''},
                {code: 0, direction: 1, coords: [53.190620, 63.617663], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.188996, 63.617401], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.188165, 63.616976], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.185551, 63.615022], descRu: 'Университет', descKz: ''},
                {code: 0, direction: 1, coords: [53.181997, 63.612452], descRu: 'Областная детская больница', descKz: ''},
                {code: 0, direction: 1, coords: [53.179515, 63.610664], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.177882, 63.609301], descRu: '25-й магазин', descKz: ''},
                {code: 0, direction: 1, coords: [53.175965, 63.607634], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.175591, 63.608810], descRu: 'Волынова', descKz: ''},
                {code: 0, direction: 1, coords: [53.174277, 63.612883], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.174093, 63.613234], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.174333, 63.613782], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.174591, 63.614240], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.174999, 63.614718], descRu: '', descKz: ''},
                {code: 0, direction: 1, coords: [53.175906, 63.615423], descRu: 'Глазная больница', descKz: ''},
                {code: 0, direction: 1, coords: [53.178599, 63.617300], descRu: 'ЦОН', descKz: ''},
                {code: 0, direction: 1, coords: [53.181452, 63.619202], descRu: 'Детская областная больница', descKz: ''},

            ]
        }
    }
])

const testASC = BUSES_ROUTES[0].directions.asc.map((a:any) => {
    return {
        ...a,
        coords: [a.coords[1], a.coords[0]]
    }
})
const testDESC = BUSES_ROUTES[0].directions.desc.map((a:any) => {
    return {
        ...a,
        coords: [a.coords[1], a.coords[0]]
    }
})


console.log(testASC)
const busesRoadMaps = ref([
    {
        id: 1,
        roadMap: testASC,
        lineColor: 'red'
    },
    {
        id: 2,
        roadMap: testDESC,
        lineColor: 'blue'
    }
])

function selectBus(bus: BusRoutes, isAsc: boolean) {
    selectedBus.value = bus
    let listOfStations: any[]
    busRoadMap.value = []
    if (isAsc) {
        listOfStations = selectedBus.value.directions.asc
    } else {
        listOfStations = selectedBus.value.directions.desc
    }
    const result = listOfStations.map(dir => {
        return [dir.coords[1], dir.coords[0]]
    })
    Object.assign(busRoadMap.value, result)
}


async function getLastCoordinates() {
    setInterval(async () => {
        const resp = await getBusGpsDataJson({
            emei: '352592579460817',
            region: 'REG_18',
            date:'26.06.2024',
            time_start:DateHelper.getTimeNowMinusHours(13),
            time_stop: DateHelper.getTimeNowMinusHours(9)
        })
        const textCoordinate = resp[resp.length - 1].RES_GPS
        const array = textCoordinate.split(',')
        const res: number[] = array.map(a => +(a.trim()))
        lastCoordinate.value = [res[1], res[0]]
    }, 1000)
}


onMounted(async () => {
    await getLastCoordinates()

    // const route = await getRouteXml({route: '24', region: CONSTANTS.REG, direction: '0'})
    // const busesByRoute = await getBusesByRoute({route: '24', region: CONSTANTS.REG})
    // console.log(route)
    // console.log(busesByRoute)
    //
    // for (const bus of busesByRoute) {
    //     if(bus.GPS_IMEI) {
    //         const result = await getBusGpsDataJson({
    //             emei: bus.GPS_IMEI,
    //             region: CONSTANTS.REG,
    //             date: DateHelper.getDateNow(),
    //             time_start:DateHelper.getTimeNowMinusHours(10),
    //             time_stop: DateHelper.getTimeNowMinusHours(9)
    //         })
    //     }
    // }
    // const resp = await getSingleBusGPSData({route: '24', region: CONSTANTS.REG})
    // console.log(resp)
    // const linesResponse = await getLinesByRegion()
    // console.log(linesResponse)
})


</script>
<style scoped>

</style>