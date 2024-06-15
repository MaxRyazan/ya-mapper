<template>
    <div style="display: flex; width: 100%; justify-content: space-evenly; margin-top: 100px;">
        <div>
            <div class="card">
                <label for="cars">Показать на карте:</label>
                <div class="wrapper">
                    <input :class="{chosen: selectedBus === '#16'}" readonly type="text" @click="choseBus('#16')"
                           value="#16">
                    <input :class="{chosen: selectedBus === '#11'}" readonly type="text" @click="choseBus ('#11')"
                           value="#11">
                </div>
            </div>
            <div class="selected" v-if="selectedBus">
                <span>Текущий выбранный автобус: {{ selectedBus }}</span>
            </div>
        </div>
        <yandex-map
                v-model="myMap"
                :settings="{
                location: {
                  center: center,
                  zoom: zoom,
                },
            }"
                width="600px"
                height="600px"
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
        <div v-if="showDialog" class="dialog">
            <span>{{ dialogData.busNumber }}</span>
            <span>{{ dialogData.coordinates }}</span>
            <span @click="showDialog = false"
                  style="position: absolute; right: 2px; top: 2px; cursor:pointer;">X</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import type {YMap} from '@yandex/ymaps3-types';
import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapFeature,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker
} from 'vue-yandex-maps';

const myMap = shallowRef<null | YMap>(null);
const selectedBus = ref()
let busRoadMap = ref<any>([])
let markers = ref<any>([])
const center = ref<any>([63.649550, 53.219485])
const zoom = ref<number>(12)
const showDialog = ref(false)
const dialogData = ref<any>()

const markers_16 = ref([
    {
        busNumber: 'y 999 op',
        coordinates: [39.72805109265226, 54.618014372899474] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png',
    },
    {
        busNumber: 's 995 op',
        coordinates: [39.73091767361658, 54.619248957441144] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/green-capybara.png',
    },
    {
        busNumber: 'x 991 op',
        coordinates: [39.72796782546529, 54.61915968525346] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/purple-capybara.png',
    },
])

const markers_11 = [
    {
        busNumber: 'j 195 op',
        coordinates: [39.692349675434784, 54.61592207696822] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png',
    },
    {
        busNumber: 'h 295 os',
        coordinates: [39.69253269812283, 54.616080223186906] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/green-capybara.png',
    },
    {
        busNumber: 'g 395 rr',
        coordinates: [39.689527502371824, 54.61479619190683] as any,
        iconSrc:
            'https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/purple-capybara.png',
    },
]

function choseBus(busNumber: string) {
    selectedBus.value = busNumber
    busRoadMap.value = []
    markers.value = []
    switch (busNumber) {
        case '#16': {
            Object.assign(busRoadMap.value, FAKE_COORDS_16)
            Object.assign(markers.value, markers_16.value)
            center.value = busRoadMap.value[0]
            zoom.value = 17
            let i = 0
            setInterval(() => {
                i++
                const exist = markers_16.value.find(s => s.busNumber === 'y 999 op')
                if(exist) {
                    if(i === 0) {
                        exist.coordinates = [39.727888410160276, 54.61805005256234]
                    }
                    if(i === 1) {
                        exist.coordinates = [39.72779520339784, 54.61810479804229]
                    }
                    if(i === 2) {
                        exist.coordinates = [39.72726852862508, 54.618426358462585]
                    }
                }

            }, 2000)
        }
            break
        case '#11': {
            Object.assign(busRoadMap.value, FAKE_COORDS_11)
            Object.assign(markers.value, markers_11)
            center.value = busRoadMap.value[0]
            zoom.value = 17
        }
            break
    }
}

function produceAnAlert(p: any) {
    dialogData.value = p
    showDialog.value = true
}


const FAKE_COORDS_16 = [
    [39.72805109265226, 54.618014372899474],
    [39.72945181762043, 54.61867438648646],
    [39.73010493550974, 54.61882580765114],
    [39.730374526291, 54.61897407222635],
    [39.73091767361658, 54.619248957441144],
    [39.731403153446806, 54.61952073478276],
    [39.73139510681983, 54.619551018430876],
    [39.73010228207655, 54.620354691639385],
    [39.729616193347155, 54.620077607108946],
    [39.72796782546529, 54.61915968525346],
    [39.727860537105656, 54.619024572119194],
    [39.727010276849825, 54.61857729784745],
    [39.72805109265226, 54.618014372899474]
]

const FAKE_COORDS_11 = [
    [39.69006236597503, 54.61451191270827],
    [39.692349675434784, 54.61592207696822],
    [39.69253269812283, 54.616080223186906],
    [39.692536491338856, 54.616184555425825],
    [39.692434074497385, 54.61638168771117],
    [39.69229751870915, 54.616532693690466],
    [39.689527502371824, 54.61479619190683],
    [39.69006236597503, 54.61451191270827],
]

// watch(myMap, () => {
// 	if(myMap?.value) {
// 		let i = 54.6
// 		let j = 39.7
//
// 		setInterval(() => {
// 			COORDS.value.push([i,j])
// 			if(i < 55) {
// 				i+=0.001
// 				j+=0.001
// 			}
// 			else {
// 				i+= -0.001
// 				j+=0.006
// 			}
// 		}, 10)
//
// 	}
// })


</script>
<style>
.card {
    display: flex;
    text-align: center;
    font-weight: bold;
    width: 300px;
    gap: 20px;
    flex-direction: column;
    border: 1px solid gray;
    padding: 20px;
}

.wrapper {
    display: flex;
    gap: 20px;

    & > * {
        width: 30px;
        outline: none;
        border: 1px solid deepskyblue;
        cursor: pointer;
        text-align: center;
    }
}

.selected {
    margin-top: 20px;
    border: 1px solid gray;
    padding: 20px;
    width: 300px;
}

.chosen {
    background-color: deepskyblue;
    color: white;
}

.pin {
    cursor: pointer;
    max-width: unset;
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.dialog {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 22px;
    width: 300px;
    height: 100px;
    background-color: orange;
    color: white;
}
</style>