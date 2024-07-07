<template>
    <div style="display: flex; justify-content: space-between">
<!--        <div class="all_buses">-->
<!--            <bus-card @select-bus="selectBus"-->
<!--                      :is-this-bus-selected="selectedBus?.busNumber === bus.busNumber"-->
<!--                      :bus="bus" v-for="bus in BUSES_ROUTES" :key="bus.busNumber"/>-->
<!--        </div>-->
        <div>
            <d-flex type="column" align="start">
                <d-flex style="width: 100%;" justify="space-between">
                    <label style="font-size: 24px;" for="emei">emei</label>
                    <input style="height: 40px; font-size: 24px;" id="emei" placeholder="emei автобуса" v-model="watchData.emei"/>
                </d-flex>
                <d-flex style="width: 100%;" justify="space-between">
                    <label style="font-size: 24px;" for="date">date</label>
                    <input style="height: 40px; font-size: 24px;" id="date" placeholder="за какую дату показать" v-model="watchData.date"/>
                </d-flex>
                <d-flex style="width: 100%;" justify="space-between">
                    <label style="font-size: 24px;" for="TIME_START">TIME_START</label>
                    <input style="height: 40px; font-size: 24px;" id="TIME_START" placeholder="TIME_Start" v-model="watchData.TIME_Start"/>
                </d-flex>
                <d-flex style="width: 100%;" justify="space-between">
                    <label style="font-size: 24px;" for="TIME_STOP">TIME_STOP</label>
                    <input style="height: 40px; font-size: 24px;" id="TIME_STOP" placeholder="TIME_Stop" v-model="watchData.TIME_Stop"/>
                </d-flex>
                <d-flex style="width: 100%;" justify="space-between">
                    <label style="font-size: 24px;" for="interval">время между отрисовкой новой координаты, сек</label>
                    <input style="height: 40px; font-size: 24px;" id="TIME_STOP" placeholder="TIME_Stop" v-model="watchData.interval"/>
                </d-flex>
            </d-flex>
            <d-flex type="column">
                <button v-if="interval" class="map__button2" @click="addCoordinate">Запомнить координату</button>
                <button style="background-color:red; width: 300px; padding: 5px 10px" @click="paintLine">прорисовать</button>
                <button @click="getDataFromBackend" class="map__button">Получить данные с бэкэнда</button>
                <button @click="startProgram"
                        v-if="isDataLoading"
                        class="map__button">{{interval ? 'Остановить цикл' : 'Запустить цикл выполнения'}}</button>
                <span v-else>данных для отображения пока нет</span>
            </d-flex>
            <d-flex v-if="apiData.length" type="column" style="max-height: 300px; overflow-y: auto; border: 1px solid blue; padding: 10px; margin-top: 20px;">
                <div v-for="data in apiData" :key=data.TimeStamp>{{data}}</div>
            </d-flex>
            <d-flex align="start" type="column" v-if="addedCoordinates.length" style="margin-top: 20px; border: 1px solid orange; overflow-y: auto; height: 200px; padding: 10px">
                <d-flex v-for="(aa, idx) in addedCoordinates" :key="idx">
                    <d-text>{{aa}}</d-text>
                </d-flex>
            </d-flex>
        </div>
        <yand-map style="width: 900px; height: 800px"
                  :lines="paintedLine"
                  :line-color="lineColor"
                  :bus-last-coordinate="lastCoordinate"
                  :currentBusesCoordinates="undefined"
                  :center="center" :zoom="15"/>
    </div>
</template>

<script setup lang="ts">
import YandMap from "@/components/reus/YandMap.vue";
import {onMounted, reactive, ref} from "vue";
import {
    getSingleBusGPSData,
} from "@/modules/map/api";
import {DateHelper} from "@/helpers/DateHelper.ts";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {GetSingleBusCoordinates} from "@/modules/map/types/api-models.ts";
import DText from "@/components/reus/texts/DText.vue";

const lastCoordinate = ref<[number, number]>([0,0])
const lineColor = ref('red')
// let busRoadMap = ref<any>([])
// const selectedBus = ref<BusRoutes | null>(null)
const center = ref([63.615375, 53.181536])
const addedCoordinates = ref<[number, number][]>([])
// const BUSES_ROUTES = reactive<BusRoutes[]>([
//     {
//         busNumber: '24',
//         directions: {
//             asc: [
//                 {code: 1, direction: 0, coords: [53.181470, 63.618944], descRu: 'Детская областная больница', descKz: ''},
//                 {code: 2, direction: 0, coords: [53.178503, 63.617023], descRu: 'ЦОН', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.177603, 63.616471], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.176878, 63.615951], descRu: '', descKz: ''},
//                 {code: 3, direction: 0, coords: [53.176789, 63.615830], descRu: 'Глазная больница', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.176640, 63.615731], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.176506, 63.615698], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.175609, 63.615051], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174990, 63.614544], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174712, 63.614237], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174416, 63.613686], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174332, 63.613490], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174260, 63.613231], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174279, 63.613032], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174303, 63.612945], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.174922, 63.611059], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.175006, 63.610943], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.175172, 63.610476], descRu: 'Волынова', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.176022, 63.607870], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.176425, 63.608201], descRu: 'Бахыт', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.178790, 63.610333], descRu: '25-й Магазин', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.181538, 63.612350], descRu: 'Областная детская больница', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.182328, 63.612906], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.182643, 63.613048], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.185780, 63.615375], descRu: 'Университет', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.186178, 63.615617], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.186786, 63.616075], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.188100, 63.617051], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.188353, 63.617214], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.188863, 63.617443], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.188988, 63.617490], descRu: ' ', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.189376, 63.617635], descRu: 'Гаражи', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.190172, 63.617706], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.191106, 63.617902], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.191309, 63.618017], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.191481, 63.618151], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.193423, 63.620331], descRu: 'По требованию', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.196034, 63.622700], descRu: 'Хакимжанова', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.197272, 63.623856], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.197412, 63.624010], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.197601, 63.624280], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.199214, 63.626567], descRu: 'Наримановский рынок', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.199608, 63.627175], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.198980, 63.628553], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.199027, 63.628838], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.199852, 63.629952], descRu: 'Фролова', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.202696, 63.633859], descRu: 'Абиль сай', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.203249, 63.634579], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.203504, 63.634009], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.203618, 63.633773], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.204034, 63.633356], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.204471, 63.634616], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.207540, 63.639148], descRu: 'Гоголя', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.209444, 63.641875], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.210210, 63.640320], descRu: 'Колос', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.211248, 63.638399], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.212607, 63.640319], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.213861, 63.637826], descRu: 'Казахтелеком', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.216653, 63.632389], descRu: 'Гостиница', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.218853, 63.628117], descRu: 'ЦОН', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.221258, 63.623373], descRu: 'Дворец спорта', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.223906, 63.618167], descRu: 'Форте банк', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.225352, 63.615350], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.224089, 63.613469], descRu: '', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.224439, 63.612664], descRu: 'Магазин "Радуга', descKz: ''},
//                 {code: 0, direction: 0, coords: [53.226861, 63.607931], descRu: 'ЖД вокзал', descKz: ''},
//             ],
//             desc: [
//                 {code: 0, direction: 1, coords: [53.226076, 63.607810], descRu: 'ЖД вокзал', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.226456, 63.608511], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.224301, 63.612704], descRu: 'Магазин "Радуга', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.223909, 63.613481], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.225226, 63.615334], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.223768, 63.618256], descRu: 'Форте банк', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.220387, 63.624887], descRu: 'Дворец спорта', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.218432, 63.628701], descRu: 'ЦОН', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.213783, 63.637793], descRu: 'Казахтелеком', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.212618, 63.639972], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.211226, 63.638076], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.209993, 63.640515], descRu: 'Казахтелеком', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.209418, 63.641587], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.207275, 63.638510], descRu: 'Гоголя', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.204529, 63.634546], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.204104, 63.633163], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.203589, 63.633675], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.203470, 63.633931], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.203258, 63.634371], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.202741, 63.633754], descRu: 'Абиль сай', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199781, 63.629731], descRu: 'Фролова', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199123, 63.628834], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199073, 63.628705], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199077, 63.628547], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199738, 63.627080], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.199393, 63.626625], descRu: 'Наримановский рынок', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.197518, 63.623970], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.196710, 63.623181], descRu: 'Хакимжанова', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.194085, 63.620729], descRu: 'По требованию', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.191399, 63.617943], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.190828, 63.617616], descRu: 'Гаражи', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.190620, 63.617663], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.188996, 63.617401], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.188165, 63.616976], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.185551, 63.615022], descRu: 'Университет', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.181997, 63.612452], descRu: 'Областная детская больница', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.179515, 63.610664], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.177882, 63.609301], descRu: '25-й магазин', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.175965, 63.607634], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.175591, 63.608810], descRu: 'Волынова', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.174277, 63.612883], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.174093, 63.613234], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.174333, 63.613782], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.174591, 63.614240], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.174999, 63.614718], descRu: '', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.175906, 63.615423], descRu: 'Глазная больница', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.178599, 63.617300], descRu: 'ЦОН', descKz: ''},
//                 {code: 0, direction: 1, coords: [53.181452, 63.619202], descRu: 'Детская областная больница', descKz: ''},
//
//             ]
//         }
//     }
// ])

// const testASC = BUSES_ROUTES[0].directions.asc.map((a: any) => {
//     return {
//         ...a,
//         coords: [a.coords[1], a.coords[0]]
//     }
// })
// const testDESC = BUSES_ROUTES[0].directions.desc.map((a: any) => {
//     return {
//         ...a,
//         coords: [a.coords[1], a.coords[0]]
//     }
// })


// const busesRoadMaps = ref([
//     {
//         id: 1,
//         roadMap: testASC,
//         lineColor: 'red'
//     },
//     {
//         id: 2,
//         roadMap: testDESC,
//         lineColor: 'blue'
//     }
// ])


// function selectBus(bus: BusRoutes, isAsc: boolean) {
//     selectedBus.value = bus
//     let listOfStations: any[]
//     busRoadMap.value = []
//     if (isAsc) {
//         listOfStations = selectedBus.value.directions.asc
//     } else {
//         listOfStations = selectedBus.value.directions.desc
//     }
//     const result = listOfStations.map(dir => {
//         return [dir.coords[1], dir.coords[0]]
//     })
//     Object.assign(busRoadMap.value, result)
// }

// function clearData(data: string[]) {
//     const res = data.map(a => a.split('!'))
//     const obj = res.map(b => {
//         return {
//             emai: +b[1],
//             coords: b[2].split(',')
//         }
//     })
//     return obj.map(c => {
//         return {
//             ...c,
//             coords: c.coords.map(a => +(a.trim()))
//         }
//     })
// }
//
// let currentBusesCoordinates = ref<any>([])
//
// function trasformCoords(coord: [number, number]) {
//     return [coord[1], coord[0]]
// }

function getCoordinatesFromString(stringCoords: string): [number, number] {
    const coords = stringCoords.split(',')
    return [+coords[1], +coords[0]]
}

function addCoordinate() {
    addedCoordinates.value.push(lastCoordinate.value)
}

const watchData = reactive({
    emei: '352592579460684',
    date: DateHelper.getDateNow(),
    TIME_Start: DateHelper.getTimeNowMinusHours(2),
    TIME_Stop: DateHelper.getTimeNow(),
    interval: 5
})
const isDataLoading = ref(false)
const apiData = ref<GetSingleBusCoordinates[]>([])

async function getDataFromBackend() {
    apiData.value = []
    isDataLoading.value = false
    const response = await getSingleBusGPSData({
        region: 'REG_18',
        emei: watchData.emei,
        date: watchData.date,
        TIME_Start: watchData.TIME_Start,
        TIME_Stop: watchData.TIME_Stop
    })
    isDataLoading.value = true
    apiData.value = response
}

const paintedLine = ref<any>([{roadMap: [], lineColor: 'red'}])
const interval = ref()

function startProgram(){
    center.value = getCoordinatesFromString(apiData.value[0].RES_GPS)
    lastCoordinate.value = getCoordinatesFromString(apiData.value[0].RES_GPS)
    if(interval.value) {
        clearInterval(interval.value)
        interval.value = null
    } else {
        let i = 0
        interval.value = setInterval(() => {
            lastCoordinate.value = getCoordinatesFromString(apiData.value[i].RES_GPS)
            i += 1
        }, watchData.interval * 1000)
    }
}

function paintLine() {
    addedCoordinates.value.forEach(i => {
        paintedLine.value[0].roadMap.push({coords: i})
    })
}

onMounted(async () => {
    // await getLastCoordinates()
    // const response = await getSingleBusGPSData({
    //     region: 'REG_18',
    //     emei: watchData.emei,
    //     date: DateHelper.getDateNow(),
    //     TIME_Start: DateHelper.getTimeNowMinusHours(2),
    //     TIME_Stop: DateHelper.getTimeNow()
    // })
    // let i = 0
    // setInterval(() => {
    //     lastCoordinate.value = getCoordinatesFromString(response[i].RES_GPS)
    //     i += 1
    // }, intervalTime.value)


    // setInterval(async () => {
    //     currentBusesCoordinates.value = []
    //     const response = await getGroupBusGPSDataJson({region: CONSTANTS.REG, route: '24'})
    //     const re:any = clearData(response)
    //     console.log(response)
    //     for(let i = 0; i < re.length; i++){
    //         currentBusesCoordinates.value.push(trasformCoords(re[i].coords))
    //     }
    //     console.log(currentBusesCoordinates.value)
    // }, 2000)


    // lastCoordinate.value = [re[2].coords[1], re[0].coords[0]]

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

.map__button {
    width: 300px;
    height: 30px;
    margin-top: 20px;
    cursor: pointer;
    background-color: blue;
    color: white;
    transition: .4s;
    &:hover{
        transition: .4s;
        background-color: darkblue;
    }
}
.map__button2 {
    width: 300px;
    height: 30px;
    margin-top: 20px;
    cursor: pointer;
    background-color: darkcyan;
    color: white;
    border: none;
    outline: none;
    &:hover{
        transition: .4s;
        background-color: orange;
    }
    &:active {
        color:red;
    }
}
</style>