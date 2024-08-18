<template>
    <div ref="tab" class="tab-content">
        <a-table size="small"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :columns="dispatchColumn"
                 :data-source="dataSource">
            <template #bodyCell="{column, record}">
                <d-flex v-if="column.key === 'actions'" justify="center">
                    <d-table-href @push="showMap(record)">карта</d-table-href>
                    <d-table-href @push="showSchema(record)">линейный</d-table-href>
                </d-flex>
            </template>
        </a-table>
        <d-table-drawer :drawer="drawer">
            <template #title>{{`Маршрут № ${selectedItem?.route}`}}</template>
            <component :currentRoute="selectedItem?.route" :is="currentComponent" />
        </d-table-drawer>
    </div>
</template>
<script setup lang="ts">
import {dispatchColumn} from "@/modules/dispatch/constants";
import {reactive, ref, shallowRef} from "vue";
import type {Component} from 'vue'
import HashMap from "@/modules/dispatch/views/hash/dispatch/HashMap.vue";
import HashLinear from "@/modules/dispatch/views/hash/dispatch/HashLinear.vue";
import DTableDrawer from "@/components/reus/DTableDrawer.vue";
import DTableHref from "@/components/reus/DTableHref.vue";

interface SelectedItemInterface {
    number: number
    points: string
    route: number
}

const selectedItem = ref<SelectedItemInterface|null>(null)
const tab = shallowRef()
const drawer = reactive({
    isOpen: false,
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
.tab-content {
    min-width: 100%;
    position: relative;
}
</style>