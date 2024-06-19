<script setup lang="ts">
import {BusRoutes} from "@/modules/map/types";
import {ref} from "vue";
import BusSubcard from "@/modules/map/BusSubcard.vue";

const props = defineProps<{
    bus: BusRoutes
    isThisBusSelected: boolean
}>()
const emits = defineEmits<{
    (e: 'selectBus', p: BusRoutes, isAsc: boolean):void
}>()

const isCardOpen = ref(false)
const ascDirection = ref(true)

function selectBus() {
    isCardOpen.value = !isCardOpen.value
    emits('selectBus', props.bus, ascDirection.value)
}

function selectDirection(newValue: boolean) {
    ascDirection.value = newValue
    emits('selectBus', props.bus, ascDirection.value)
}

</script>

<template>
<div class="card">
    <span @click="selectBus"
          :class="{active: props.isThisBusSelected}"
          style="font-weight: bolder;cursor: pointer">Автобус № {{props.bus.busNumber}}</span>
    <div style="padding-left: 20px;" v-if="isCardOpen">
        <div>
            <p>Направление движения:</p>
            <div style="display: flex; justify-content: space-evenly;">
                <span :class="{active: ascDirection}"
                      style="cursor:pointer;"
                      @click="selectDirection(true)">прямое</span>
                <span :class="{active: !ascDirection}"
                      style="cursor:pointer;"
                      @click="selectDirection(false)">обратное</span>
            </div>
        </div>
        <div v-if="ascDirection" style="display: flex; flex-direction: column; gap: 5px">
            <bus-subcard v-for="station in props.bus.directions.asc"
                         :key="station.code"
                         :station="station"/>
        </div>
        <div v-else>
            <bus-subcard v-for="station in props.bus.directions.desc"
                         style="display: flex; flex-direction: column; gap: 10px"
                         :key="station.code"
                         :station="station"/>
        </div>
    </div>
</div>
</template>

<style scoped>
.card {
    & span:hover {
        color: var(--primary-color)
    }
}
.active {
    color: var(--primary-color)
}
</style>