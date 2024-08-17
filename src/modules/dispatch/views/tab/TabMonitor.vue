<template>
    <div class="tab-content">
        <a-table size="small"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :columns="dispatchColumn"
                 :data-source="dataSource">
            <template #bodyCell="{column, record}">
                <d-flex v-if="column.key === 'actions'" justify="center">
                    <router-link :to="{query: {tab: 'monitor', route: record.route}, hash: '#map'}">карта</router-link>
                    <router-link :to="{query: {tab: 'monitor', route: record.route}, hash: '#linear'}">линейный</router-link>
                </d-flex>
            </template>
        </a-table>
        <component :is="currentHashComponent" />
    </div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {dispatchColumn} from "@/modules/dispatch/constants";
import {shallowRef, watch} from "vue";
import type {Component} from "vue";
import HashMap from "@/modules/dispatch/views/hash/dispatch/HashMap.vue";
import HashLinear from "@/modules/dispatch/views/hash/dispatch/HashLinear.vue";

const route = useRoute()
const currentHashComponent = shallowRef<Component | null>(null)

watch(() => route.hash, () => {
    currentHashComponent.value = null
    if(route.hash) {
        currentHashComponent.value = componentMap.get(route.hash) as any
    }
})

const componentMap = new Map([
    ['#map', HashMap],
    ['#linear', HashLinear],
])

const dataSource = [
    {
        number: 1,
        route: 24,
        points: '1-2',
    },
    {
        number: 2,
        route: 27,
        points: '3-4',
    }
]

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
    min-width: 100%;
}
</style>