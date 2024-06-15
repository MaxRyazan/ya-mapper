<script setup lang="ts">
import {Station} from "@/modules/map/types";

const props = defineProps<{
    station: Station
}>()
</script>

<template>
    <div class="subcard">
        <span>{{props.station.descRu}}</span>
    </div>
</template>

<style scoped>
.subcard {
    padding: 4px 10px;
    cursor: pointer;
    border-left: 2px solid var(--primary-color);
    &:hover {
        background-color: var(--primary-color);
        color: white;
    }
}
</style>