<template>
    <div ref="tab" class="tab-content">
        <a-table size="small"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :columns="dispatchColumn"
                 :data-source="dataSource">
            <template #bodyCell="{column, record}">
                <d-flex v-if="column.key === 'actions'" justify="center">
                    <d-text @click="showMap(record)" cursor="pointer" class="dispatch-table__href" color="#1677FF">
                        карта
                    </d-text>
                    <d-text @click="showSchema(record)" cursor="pointer" class="dispatch-table__href" color="#1677FF">
                        линейный
                    </d-text>
                </d-flex>
            </template>
        </a-table>
        <a-drawer :get-container="false"
                  destroyOnClose
                  style="border-radius: 8px"
                  width="100%"
                  :style="{ position: 'absolute' }"
                  v-model:open="drawer.isOpen">
            <template #closeIcon>
                <right-outlined/>
            </template>
            <template #title>
                <d-text weight="700" color="rgba(0,0,0,.45)">Маршрут № {{ selectedItem?.route }}</d-text>
            </template>
            <component :currentRoute="selectedItem?.route" :is="currentComponent"/>
        </a-drawer>
    </div>
</template>
<script setup lang="ts">
import {dispatchColumn} from "@/modules/dispatch/constants";
import DText from "@/components/reus/texts/DText.vue";
import {reactive, ref, shallowRef} from "vue";
import {RightOutlined} from "@ant-design/icons-vue";
import type {Component} from 'vue'
import HashMap from "@/modules/dispatch/views/hash/dispatch/HashMap.vue";
import HashLinear from "@/modules/dispatch/views/hash/dispatch/HashLinear.vue";

interface SelectedItemInterface {
    number: number
    points: string
    route: number
}

const selectedItem = ref<SelectedItemInterface|null>(null)
const tab = shallowRef()
const drawer = reactive({
    isOpen: false
})
const currentComponent = shallowRef<Component | null>(null)

function showMap(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = HashMap
}

function showSchema(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = HashLinear
}

// watch(() => route.hash, () => {
//     currentHashComponent.value = null
//     if(route.hash) {
//         currentHashComponent.value = componentMap.get(route.hash) as any
//     }
// })
//
// const componentMap = new Map([
//     ['#map', HashMap],
//     ['#linear', HashLinear],
// ])

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

.dispatch-table__href {
    &:hover {
        color: hsl(215 100 74) !important;
    }
}

.tab-content {
    min-width: 100%;
    position: relative;
}

:deep(.ant-drawer-mask) {
    border-radius: 8px !important;
}

:deep(.ant-drawer-header) {
    border-radius: 8px 0 0 0 !important;
}
</style>