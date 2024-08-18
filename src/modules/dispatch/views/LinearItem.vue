<template>
    <d-flex class="station__card" align="start">
        <div class="bus__icon" v-if="props.showBusIcon?.visible">
            <d-text size="12px" style="position: absolute; left: -55%; top: -15px;"
            >{{showBusIcon?.GRN}}</d-text>
        </div>
        <div class="station__point"></div>
        <d-text class="station__name" :title="props.station?.NAME_RU">{{props.station?.NAME_RU}}</d-text>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";


interface LinearItemInterface {
    station?: any
    showBusIcon?: any
}

const props = withDefaults(defineProps<LinearItemInterface>(), {
    showBusIcon: {
        visible: false,
        GRN: ''
    }
})

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
.bus__icon {
    width: 20px;
    height: 12px;
    background-color: red;
    transform: rotate(-70deg);
    position: absolute;
    top: -30px;
    left: -10px;
}
</style>