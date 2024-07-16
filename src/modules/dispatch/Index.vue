<template>
    <component :is="currentComponent" />
</template>
<script setup lang="ts">
import {onMounted, shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import HashMonitor from "@/modules/dispatch/views/hashes/HashMonitor.vue";
import HashPath from "@/modules/dispatch/views/hashes/HashPath.vue";

const currentComponent = shallowRef(HashMonitor)
const route = useRoute()

const SUB_COMPONENTS_MAP = new Map([
    ['#monitor', HashMonitor],
    ['#path', HashPath],
])

watch(() => route.hash, () => {
    currentComponent.value = SUB_COMPONENTS_MAP.get(route.hash)
})

onMounted(() => {
    currentComponent.value = SUB_COMPONENTS_MAP.get(route.hash)
})
</script>

<style scoped>

</style>