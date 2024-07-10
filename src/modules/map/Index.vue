<template>
    <div style="display: flex; justify-content: space-between">
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
                <div style="font-size: 22px;" v-if="marketCoordinate">[{{marketCoordinate}}]: {{ apiData.find(a => a.RES_GPS === marketCoordinate?.toString())!.TimeStamp }}</div>
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
                    <d-text>{{[aa[1], aa[0]]}}</d-text>
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

const center = ref([63.615375, 53.181536])
const addedCoordinates = ref<[number, number][]>([])

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
const savedIntervalCoordinate = ref<any>(null)


const marketCoordinate = ref<any>(null)

function startProgram(){
    if(interval.value) {
        marketCoordinate.value = apiData.value[savedIntervalCoordinate.value].RES_GPS
        clearInterval(interval.value)
        interval.value = null
    } else {
        let i = 0
        if(savedIntervalCoordinate.value) {
            i = savedIntervalCoordinate.value
            center.value = getCoordinatesFromString(apiData.value[i].RES_GPS)
            lastCoordinate.value = getCoordinatesFromString(apiData.value[i].RES_GPS)
        }
        interval.value = setInterval(() => {
            lastCoordinate.value = getCoordinatesFromString(apiData.value[i].RES_GPS)
            i += 1
            savedIntervalCoordinate.value = i
        }, watchData.interval * 1000)
    }
}

function paintLine() {
    paintedLine.value[0].roadMap = []
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
    // }, 500)


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
.active {
    color: blue !important;
}
</style>