<template>
    <d-flex align="start" type="column" gap="40px">
        <d-flex style="height: 40px">
            <da-breadcrumbs v-if="route.query.tab && route.hash" style="margin-top: 20px; padding-left: 20px;"
                            :current-link-name="`${route.hash ? '/' + aliasHashMap.get(route.hash) : ''}`"
                            link-to="/dispatch?tab=monitor"
                            :prev-location-name="aliasMap.get(route.query.tab as string) ?? ''"/>
        </d-flex>
        <d-flex style="width: 100%;">
            <component :is="currentComponent"/>
        </d-flex>
    </d-flex>
</template>
<script setup lang="ts">
import {onMounted, shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import type {Component} from 'vue'
import TabMonitor from "@/modules/dispatch/views/tab/TabMonitor.vue";
import TabPath from "@/modules/dispatch/views/tab/TabPath.vue";
import TabVectors from "@/modules/dispatch/views/tab/TabVectors.vue";
import TabScrew from "@/modules/dispatch/views/tab/TabScrew.vue";
import TabList from "@/modules/dispatch/views/tab/TabList.vue";
import TabWeekend from "@/modules/dispatch/views/tab/TabWeekend.vue";
import TabNodes from "@/modules/dispatch/views/tab/TabNodes.vue";
import TabGraphMap from "@/modules/dispatch/views/tab/TabGraphMap.vue";
import TabGraphStations from "@/modules/dispatch/views/tab/TabGraphStations.vue";
import TabGraphReis from "@/modules/dispatch/views/tab/TabGraphReis.vue";
import TabFuture from "@/modules/dispatch/views/tab/TabFuture.vue";
import TabMessage from "@/modules/dispatch/views/tab/TabMessage.vue";
import DaBreadcrumbs from "@/components/reus/DaBreadcrumbs.vue";

const currentComponent = shallowRef<Component | null>(null)
const route = useRoute()

const SUB_COMPONENTS_MAP = new Map([
    ['monitor', TabMonitor],
    ['path', TabPath],
    ['vectors', TabVectors],
    ['screw', TabScrew],
    ['list', TabList],
    ['weekend', TabWeekend],
    ['nodes', TabNodes],
    ['graph-map', TabGraphMap],
    ['graph-stations', TabGraphStations],
    ['graph-reis', TabGraphReis],
    ['future', TabFuture],
    ['message', TabMessage],
])

const aliasMap = new Map([
    ['monitor', 'мониторинг']
])

const aliasHashMap = new Map([
    ['#map', 'карта'],
    ['#linear', 'линейный']
])

watch(() => route.query, () => {
    const component = SUB_COMPONENTS_MAP.get(route.query.tab as string)
    if (!component) currentComponent.value = null
    if (component) currentComponent.value = component
})

onMounted(async () => {
    const component = SUB_COMPONENTS_MAP.get(route.query.tab as string)
    if (component) currentComponent.value = component
})
</script>

<style scoped>

</style>