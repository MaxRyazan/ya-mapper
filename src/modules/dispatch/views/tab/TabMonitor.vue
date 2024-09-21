<template>
    <div ref="tab" class="tab-content">
        <a-table size="small"
                 style="height: 100%;"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :columns="returnedColumns"
                 :data-source="allRoutes">
            <template #bodyCell="{column, record}">
                <d-flex v-if="column.key === 'actions'" justify="center">
                    <d-table-href @push="showMap(record)">карта</d-table-href>
                    <d-table-href @push="showSchema(record)">линейный</d-table-href>
                </d-flex>
            </template>
        </a-table>
        <d-table-drawer :drawer="drawer">
            <template #title>{{`Маршрут № ${+selectedItem?.routeNumber}`}}</template>
            <component :currentRoute="+selectedItem?.routeNumber" :is="currentComponent" />
        </d-table-drawer>
    </div>
</template>
<script setup lang="ts">
import {dispatchColumn} from "@/modules/dispatch/constants";
import {onMounted, reactive, ref, shallowRef} from "vue";
import type {Component} from 'vue'
import HashLinear from "@/modules/dispatch/views/hash/dispatch/HashLinear.vue";
import DTableDrawer from "@/components/reus/DTableDrawer.vue";
import DTableHref from "@/components/reus/DTableHref.vue";
import RouteIdPath from "@/modules/routes/views/RouteIdPath.vue";
import {getAllRoutes} from "@/modules/routes/api/Index.ts";
import {authUser} from "@/stores/user.ts";
import {REG} from "@/constants.ts";
import {allRoutes} from "@/modules/routes/stores/allRoutes.ts";
import {useGetBuses} from "@/hooks/useGetAllBuses.ts";
import {CURRENT_LOCALE, Languages} from "@/locales";

const returnedColumns = dispatchColumn.filter(a => {
    if(CURRENT_LOCALE.value === Languages.kz) {
        return a.key !== 'descRu'
    }
    if(CURRENT_LOCALE.value === Languages.ru) {
        return a.key !== 'descKZ'
    }
    else return a
})

const isLoading = ref(false)
const selectedItem = ref<any>(null)
const tab = shallowRef()
const drawer = reactive({
    isOpen: false,
})
const currentComponent = shallowRef<Component | null>(null)

function showMap(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = RouteIdPath
}

function showSchema(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = HashLinear
}

onMounted(async () => {
    if(!REG.value || !authUser.value?.BIN) return
    isLoading.value = true
    const response = await getAllRoutes({bin: authUser.value!.BIN, region: `REG_${REG.value}`})
    allRoutes.value = response.map((a, idx) => {
        return {
            key: idx + 1,
            type: 'Автобус',
            routeNumber: a.ROUTE,
            descRu: a.NAME_RU,
            descKZ: a.NAME_KZ,
            tarifCity: a.TAR_CITY,
            zones: a.ZONES,
            tarifBeznal: a.TAR_BEZ,
            tarifCahs: a.TAR_CASH,
            operations: ''
        }
    })
    await useGetBuses()
    isLoading.value = false
})
</script>


<style scoped>
.tab-content {
    min-width: 100%;
    position: relative;
}
</style>