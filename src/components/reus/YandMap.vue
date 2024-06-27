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
                        v-for="line in lines" :key="line.id"
                        :settings="{
                            geometry: {
                            type: 'LineString',
                            coordinates: line.roadMap.map(r => [r.coords[1], r.coords[0]]),
                        },
                        style: {
                          stroke: [{ color: line.lineColor, width: 4 }],
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
                <yandex-map-marker v-if="props.busLastCoordinate"
                                   :settings="{ coordinates: busLastCoordinate }"
                                   position="top-center left-center">
                    <img
                            class="pin"
                            alt=""
                            src="@/assets/img/where-icon.png"
                            @click="produceAnAlert('marker')"
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

const myMap = shallowRef<null | any>(null);
let markers = ref<any>([])

const props = defineProps<{
    lines: any[],
    center: any,
    zoom: number,
    lineColor: string
    busLastCoordinate: number[]
}>()

function produceAnAlert(p: any) {
    console.log(p)
}


onMounted(() => {
    console.log(props.busLastCoordinate)

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
    width: 40px;
    padding-bottom: 20px;
}
</style>