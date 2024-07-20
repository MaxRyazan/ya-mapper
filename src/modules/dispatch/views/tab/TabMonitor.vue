<template>
    <d-flex type="column" style="margin-top: 5px;">
        <d-flex gap="0" style="width: 99%">
            <d-text v-for="hashLink in hashes"
                    :key="hashLink.hash"
                    cursor="pointer"
                    :class="{'hash-active': route.hash === hashLink.hash}"
                    size="18px"
                    @click="changeComponent(hashLink)"
                    class="tab">{{ hashLink.tabName }}
            </d-text>
        </d-flex>
        <component :is="currentComponent"/>
    </d-flex>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref, shallowRef} from "vue";
import DispatchMap from "@/modules/dispatch/views/hash/DispatchMap.vue";
import DispatchLinear from "@/modules/dispatch/views/hash/DispatchLinear.vue";
import router from "@/configs/router.ts";
import {useRoute} from "vue-router";
import DText from "@/components/reus/texts/DText.vue";

const route = useRoute()
const currentComponent = shallowRef(DispatchMap)

const hashes = reactive([
    {tabName: 'Карта', hash: '#map', component: shallowRef(DispatchMap)},
    {tabName: 'Линейный', hash: '#linear', component: shallowRef(DispatchLinear)},
])

function changeComponent(tab: any) {
    currentComponent.value = tab.component
    router.push({hash: tab.hash, query: {tab: route.query.tab}})
}

onMounted(() => {
    if (!route.hash) {
        router.push({path: route.path, query: {tab: route.query.tab}, hash: hashes[0].hash})
    }
})
</script>


<style scoped>
.tab {
    padding: 10px;
    width: 100%;
    text-align: center;
    border: 1px solid white;
    background-color: var(--main-nav-bg);
    color: rgba(255, 255, 255, .5) !important;
    &:nth-child(1) {
        border-radius: 6px 0 0 6px;
    }
    &:last-child {
        border-radius: 0 6px 6px 0;
    }
}

.hash-active {
    color: var(--primary-color) !important;
}
</style>