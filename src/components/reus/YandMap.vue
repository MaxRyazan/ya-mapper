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
                    <img
                            class="pin"
                            alt=""
                            src="@/assets/img/circle.png"
                            @click="produceAnAlert(marker)"
                    />
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

const PATH = []

function produceAnAlert(p: any) {
    console.log(p)
    PATH.push(p)
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
    width: 10px;
    height: 10px;
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
    right: -35px;
    border-radius: 6px;
    padding: 2px 6px;
    color: black;
    border: 1px solid black;
}
</style>