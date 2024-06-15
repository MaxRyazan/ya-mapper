<template>
    <div class="wrapper">
        <div class="all_buses">
            <bus-card @select-bus="selectBus"
                      :is-this-bus-selected="selectedBus?.busNumber === bus.busNumber"
                      :bus="bus" v-for="bus in BUSES" :key="bus.busNumber"/>
        </div>
        <div class="map">
            <yandex-map
                    v-model="myMap"
                    :settings="{
                        location: {
                              center: center,
                              zoom: zoom,
                            },
                        }"
                    width="100%"
                    height="100%"
            >
                <yandex-map-default-scheme-layer/>
                <yandex-map-default-features-layer/>

                <yandex-map-feature
                        :settings="{
                            geometry: {
                            type: 'LineString',
                            coordinates: busRoadMap,
                        },
                    style: {
                      stroke: [{ color: '#007afce6', width: 4 }],
                    },
                }"
                />
                <yandex-map-marker v-if="markers.length" v-for="marker in markers" :key="marker.busNumber"
                                   :settings="{ coordinates: marker.coordinates }"
                                   position="top-center left-center">
                    <img
                            class="pin"
                            alt=""
                            :src="marker.iconSrc"
                            @click="produceAnAlert(marker)"
                    />
                </yandex-map-marker>
            </yandex-map>
        </div>
    </div>
</template>
<script setup lang="ts">
import {reactive, ref, shallowRef} from "vue";
import BusCard from "@/modules/map/BusCard.vue";
import {Bus} from "@/modules/map/types";
import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapFeature,
    YandexMapMarker
} from "vue-yandex-maps";
import {YMap} from "@yandex/ymaps3-types";

const myMap = shallowRef<null | YMap>(null);
const center = ref<any>([63.649550, 53.219485])
const zoom = ref<number>(12)
let busRoadMap = ref<any>([])
let markers = ref<any>([])
const selectedBus = ref<Bus|null>(null)

const BUSES = reactive<Bus[]>([
    {
        busNumber: '24',
        directions: {
            asc: [
                {code: 6278, coords: [53.181536, 63.619245], descRu: 'Областная детская больница', descKz: 'Обл. балалар ауруханасы'},
                {code: 6279, coords: [53.178543, 63.616992], descRu: 'ЦОН', descKz: 'ХҚКО'},
                {code: 6280, coords: [53.176681, 63.615739], descRu: 'Глазная больница', descKz: 'Көз ауруханасы'},
                {code: 6281, coords: [53.175132, 63.610402], descRu: 'Волынова', descKz: 'Волынова'},
                {code: 6282, coords: [53.176356, 63.608124], descRu: 'Маг. Бахыт', descKz: 'Бахыт" дүкені'},
                {code: 6283, coords: [53.178828, 63.610225], descRu: '25-й магазин', descKz: '25-ші дүкен'},
                {code: 6284, coords: [53.181566, 63.612328], descRu: 'Обл.детская больница', descKz: 'Обл. балалар ауруханасы'},
                {code: 6285, coords: [53.185780, 63.615375], descRu: 'Университет', descKz: 'Университет'},
                {code: 6286, coords: [53.189376, 63.617635], descRu: 'Гаражи', descKz: 'Гараждар'},
                {code: 6287, coords: [53.193444, 63.620318], descRu: 'По требованию', descKz: 'Талап бойынша'},
                {code: 6288, coords: [53.196034, 63.622702], descRu: 'Хакимжанова', descKz: 'Хакимжанова'},
                {code: 6289, coords: [53.199214, 63.626567], descRu: 'Наримановский рынок', descKz: 'Нариман базары'},
                {code: 6290, coords: [53.199852, 63.629952], descRu: 'Фролова', descKz: 'Фролов'},
                {code: 6291, coords: [53.202764, 63.633924], descRu: 'Абиль сай', descKz: 'Абиль сай'},
                {code: 6292, coords: [53.207540, 63.639148], descRu: 'Гоголя', descKz: 'Гоголь'},
                {code: 6293, coords: [53.210210, 63.640320], descRu: 'Колос', descKz: 'Колос'},
                {code: 6294, coords: [53.213861, 63.637826], descRu: 'Казахтелеком', descKz: 'Казахтелеком'},
                {code: 6295, coords: [53.216653, 63.632389], descRu: 'Гостиница', descKz: 'Қонақ үй'},
                {code: 6296, coords: [53.218732, 63.628322], descRu: 'ЦОН', descKz: 'ХҚКО'},
                {code: 6297, coords: [53.221258, 63.623373], descRu: 'Дворец спорта', descKz: 'Спорт сарайы'},
                {code: 6298, coords: [53.223906, 63.618167], descRu: 'Форте банк', descKz: 'Форте банкі'},
                {code: 6299, coords: [53.224439, 63.612664], descRu: 'Магазин "Радуга"', descKz: 'Радуга" дүкені'},
                {code: 6300, coords: [53.226861, 63.607931], descRu: 'ЖД вокзал', descKz: 'ТЖ вокзалы'},
            ],
            desc: []
        }
    }
])

function produceAnAlert(p: any) {
    console.log(p)
}

function selectBus (bus: Bus, isAsc: boolean) {
    selectedBus.value = bus
    let listOfStations: any[]
    busRoadMap.value = []
    if(isAsc) {
        listOfStations = selectedBus.value.directions.asc
    } else {
        listOfStations = selectedBus.value.directions.desc
    }
    const result = listOfStations.map(dir => {
        return [dir.coords[1], dir.coords[0]]
    })
    Object.assign(busRoadMap.value, result)
    console.log(busRoadMap.value)
}

</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 30px;
    width: 100%;
    height: 100%;
}
.map {
    width: 100%;
    max-width: 800px;
    max-height: 800px;
}
</style>