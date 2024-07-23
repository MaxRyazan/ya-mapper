<template>
    <d-flex type="column" gap="4px">
        <d-flex style="margin-top: 5px; width: 99%;" gap="0">
            <d-flex class="tab" gap="0" style="width: 99%; position: relative;" v-for="hashLink in hashes" :key="hashLink.hash">
                <d-text
                        cursor="pointer"
                        :class="{'hash-active': route.hash === hashLink.hash}"
                        size="18px"
                        class="tab-item"
                        @click="changeComponent(hashLink)">
                    {{ hashLink.tabName }}
                </d-text>
                <div v-if="route.hash === hashLink.hash" class="d-connector"></div>
            </d-flex>
        </d-flex>
        <div class="tab-content">
            <component style="width: calc(99% - 2px)" :is="currentComponent"/>
        </div>
    </d-flex>
</template>
<script setup lang="ts">
import {reactive, shallowRef} from "vue";
import DispatchMap from "@/modules/dispatch/views/hash/DispatchMap.vue";
import DispatchLinear from "@/modules/dispatch/views/hash/DispatchLinear.vue";
import DispatchReport from "@/modules/dispatch/views/hash/DispatchReport.vue";
import router from "@/configs/router.ts";
import {useRoute} from "vue-router";
import DText from "@/components/reus/texts/DText.vue";

const route = useRoute()
const currentComponent = shallowRef(DispatchMap)

const hashes = reactive([
    {tabName: 'Сводный отчет', hash: '#report', component: shallowRef(DispatchReport)},
    {tabName: 'Карта', hash: '#map', component: shallowRef(DispatchMap)},
    {tabName: 'Линейный', hash: '#linear', component: shallowRef(DispatchLinear)},
])

async function changeComponent(tab: any) {
    currentComponent.value = tab.component
    await router.push({hash: tab.hash, query: {tab: route.query.tab}})
}

</script>


<style scoped>
.tab {
    user-select: none;
    padding: 10px;
    width: 100%;
    border: 1px solid white;
    background-color: var(--main-nav-bg);

    &:nth-child(1) {
        border-radius: 6px 0 0 6px;
    }

    &:last-child {
        border-radius: 0 6px 6px 0;
    }
}

.tab-item {
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, .5) !important;
}

.hash-active {
    color: var(--primary-color) !important;
}

.d-connector {
    position: absolute;
    top: 38px;
    left: 0;
    background-color: var(--main-nav-bg);
    width: 100%;
    padding: 4px
}
.tab-content {
    width: calc(99% - 2px);
    border: 1px solid var(--main-nav-bg);
    height: calc(100vh - 55px);
}
</style>