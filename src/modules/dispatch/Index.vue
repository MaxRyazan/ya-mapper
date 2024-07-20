<template>
    <component :is="currentComponent" />
</template>
<script setup lang="ts">
import {onMounted, shallowRef, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import HashMonitor from "@/modules/dispatch/views/tab/TabMonitor.vue";
import HashPath from "@/modules/dispatch/views/tab/TabPath.vue";
import type { Component} from 'vue'

const currentComponent = shallowRef<Component>(HashMonitor)
const route = useRoute()
const router = useRouter()

const SUB_COMPONENTS_MAP = new Map([
    ['monitor', HashMonitor],
    ['path', HashPath],
])

watch(() => route.query, () => {
    const component = SUB_COMPONENTS_MAP.get(route.query.tab as string)
    if(component) currentComponent.value = component
})

onMounted(() => {
    const component = SUB_COMPONENTS_MAP.get(route.query.tab as string)
    if(component) currentComponent.value = component
    if(!route.query.tab) {
        router.push({query: {tab: 'monitor'}})
    }
})
</script>

<style scoped>

</style>