<template>
    <d-flex class="station__card" align="start">
        <div class="station__point"></div>
        <d-text class="station__name">{{props.station.NAME_RU}}</d-text>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";

const props = defineProps<{
    station: any
}>()
</script>


<style scoped>
.station__card {
    position: relative;
    transform: rotate(70deg);
    transform-origin: left;
}
.station__point {
    z-index: 999;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    background-color: white;
}
.station__name {
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 15px;
}
</style>