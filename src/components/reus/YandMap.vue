<template>
    <div class="wrapper">
        <div class="map">
            <yandex-map
                    v-model="myMap"
                    :settings="{
                        location: {
                              center: props.center ?? [0, 0],
                              zoom: props.zoom ?? 12,
                            },
                        }"
                    width="100%"
                    height="100%"
            >
                <yandex-map-default-scheme-layer/>
                <yandex-map-default-features-layer/>

                <yandex-map-feature
                        v-for="line in props.lines" :key="line.id"
                        :settings="{
                            geometry: {
                            type: 'LineString',
                            coordinates: line.roadMap.map((a:Station) => a.coords),
                        },
                        style: {
                          stroke: [{ color: line.lineColor, width: 4 }],
                        },
                }"
                />
                <yandex-map-marker v-for="marker in markers" :key="marker.code"
                                   :settings="{ coordinates: marker.coords}"
                                   position="top-center left-center">
                    <div class="station__info"
                         v-if="isDialogVisible && selectedStation && marker.coords === selectedStation.coords">
                        {{ selectedStation.code }} - {{ selectedStation.descRu }}
                    </div>
                    <div @click="produceAnAlert(marker)"
                         style="border: 2px solid black; background-color:white; position: relative; border-radius: 50%; height: 12px; width: 12px; cursor:pointer;"
                         :style="{
                             border:  marker.coords === selectedStation?.coords ? '2px solid blue' : '2px solid black',
                             backgroundColor: marker.coords === selectedStation?.coords ? 'blue' : 'white',
                         }"
                    >
                    </div>
                </yandex-map-marker>

                <yandex-map-marker v-for="(bus, idx) in props.currentBusesCoordinates" :key="idx"
                                   :settings="{ coordinates: bus.coord as any}"
                                   position="top-center left-center">
                    <d-text class="bus__number-container">{{ getBusGRN(bus?.emei) }}</d-text>
                    <svg v-if="bus.direction === 0" fill="white" stroke="red"
                         class="bus" viewBox="0 0 500 500"
                         @click="produceAnAlert(bus.coord)"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs/>
                        <path style="stroke-width: 10px" d="M 457.974 55.958 L 130.546 55.958 L 35.046 374.291 L 139.641 178.744 L 453.427 169.649 L 457.974 55.958 Z"/>
                    </svg>
                    <svg v-if="bus.direction === 1" fill="white" stroke="blue"
                         class="bus" viewBox="0 0 500 500"
                         @click="produceAnAlert(bus.coord)"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs/>
                        <path style="stroke-width: 10px" d="M 457.974 55.958 L 130.546 55.958 L 35.046 374.291 L 139.641 178.744 L 453.427 169.649 L 457.974 55.958 Z"/>
                    </svg>
                    <svg v-if="bus.direction === 7" fill="white" stroke="black"
                         class="bus" viewBox="0 0 500 500"
                         @click="produceAnAlert(bus.coord)"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs/>
                        <path style="stroke-width: 10px" d="M 457.974 55.958 L 130.546 55.958 L 35.046 374.291 L 139.641 178.744 L 453.427 169.649 L 457.974 55.958 Z"/>
                    </svg>
                </yandex-map-marker>

                <yandex-map-marker v-if="props.busLastCoordinate"
                                   :settings="{ coordinates: (busLastCoordinate as any) }"
                                   position="top-center left-center">
                    <img
                            class="bus2"
                            alt=""
                            src="@/assets/img/where-icon.png"
                            @click="produceAnAlert(busLastCoordinate)"
                    />

                </yandex-map-marker>
            </yandex-map>
        </div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, ref, shallowRef, watch} from "vue";
import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapFeature,
    YandexMapMarker
} from "vue-yandex-maps";
import {Station} from "@/modules/map/types";
import DText from "@/components/reus/texts/DText.vue";
import {BusOnMap} from "@/modules/routes/types/Index.ts";
import {getBusGRN} from "@/stores/buses.ts";

const myMap = shallowRef<null | any>(null);
let markers = ref<any>([])

const props = defineProps<{
    lines: any[],
    busStationsMarkers?: any[],
    center: any,
    zoom?: number,
    busLastCoordinate?: number[]
    currentBusesCoordinates?: BusOnMap[]
}>()

const selectedStation = ref<Station | null>(null)
const isDialogVisible = ref(false)

function produceAnAlert(p: any) {
    isDialogVisible.value = true
    selectedStation.value = p
}

watch(() => props.busStationsMarkers, () => {
    markers.value = []
    let ascStations;
    let descStations;

    if (props.lines[0]) {
        ascStations = props.lines[0]?.roadMap.filter((a: any) => a.code)
        markers.value = [...markers.value, ...ascStations]
    }
    if (props.lines[1]) {
        descStations = props.lines[1]?.roadMap.filter((a: any) => a.code)
        markers.value = [...markers.value, ...descStations]
    }
}, {deep: true})

watch(() => props.currentBusesCoordinates, () => {
})

onMounted(() => {
    let ascStations;
    let descStations;

    if (props.lines[0]) {
        ascStations = props.lines[0]?.roadMap.filter((a: any) => a.code)
        markers.value = [...markers.value, ...ascStations]
    }
    if (props.lines[1]) {
        descStations = props.lines[1]?.roadMap.filter((a: any) => a.code)
        markers.value = [...markers.value, ...descStations]
    }
})

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
}

.pin {
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 0;
    position: absolute;
    inset: 0 0 0 0;
}

.bus {
    cursor: pointer;
    width: 100px;
    transform: translate(40px, -25px);
}
.bus2 {
    cursor: pointer;
    width: 50px;
    transform: translateY(-25px);
}

.bus__number-container {
    display: flex;
    align-items: center;
    background-color: white;
    position: absolute;
    height: 16px;
    font-size: 12px !important;
    right: -28px;
    top: -10px;
    border-radius: 6px;
    padding: 2px 2px;
    color: black;
    z-index: 9900;
}

.station__info {
    position: absolute;
    background-color: white;
    white-space: nowrap;
    border-radius: 6px;
    padding: 4px;
    border: 2px solid black;
    left: 15px;
    top: -8px;
}
</style>