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
                    <d-text class="bus__number-container">{{ bus?.emei }}</d-text>
                    <img style="position: relative"
                         class="bus"
                         alt=""
                         src="@/assets/img/svg/where-icon.svg"
                         @click="produceAnAlert(bus.coord)"
                    />
                </yandex-map-marker>

                <yandex-map-marker v-if="props.busLastCoordinate"
                                   :settings="{ coordinates: (busLastCoordinate as any) }"
                                   position="top-center left-center">
                    <img
                            class="bus"
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
    console.log(props.currentBusesCoordinates)
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
    max-width: 800px;
    max-height: 800px;
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
    width: 80px;
    transform: translateX(35px);
    margin-bottom: 35px;
}

.bus__number-container {
    display: flex;
    align-items: center;
    background-color: white;
    position: absolute;
    height: 30px;
    right: -38px;
    border-radius: 6px;
    padding: 2px 6px;
    color: black;
    border: 2px solid black;
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