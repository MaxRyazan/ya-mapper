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

                <yandex-map-marker v-for="(coord, idx) in currentBusesCoordinates" :key="idx"
                                   :settings="{ coordinates: coord}"
                                   position="top-center left-center">
                    <img
                            class="bus"
                            alt=""
                            src="@/assets/img/where-icon.png"
                            @click="produceAnAlert(coord)"
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
import {onMounted, ref, shallowRef} from "vue";
import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapFeature,
    YandexMapMarker
} from "vue-yandex-maps";
import {Station} from "@/modules/map/types";

const myMap = shallowRef<null | any>(null);
let markers = ref<any>([])

const props = defineProps<{
    lines: any[],
    center: any,
    zoom?: number,
    busLastCoordinate?: number[]
    currentBusesCoordinates?: [number, number][]
}>()

const PATH = []

function produceAnAlert(p: any) {
    console.log(p)
    PATH.push(p)
}


onMounted(() => {
    console.log('1')
    const ascStations = props.lines[0].roadMap.filter((a:any) => a.code)
    console.log('2')
    const descStations = props.lines[1].roadMap.filter((a:any) => a.code)
    console.log('asdasd')
    markers.value = [...ascStations, ...descStations]
    console.log('assgdfg')
    console.log(markers.value)
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
    width: 14px;
    height: 14px;
}
.bus {
    cursor: pointer;
    width: 40px;
    margin-bottom: 20px;
}
</style>