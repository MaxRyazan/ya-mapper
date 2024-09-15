<template>
    <d-flex class="route__wrapper" type="column">
        <d-spin :is-loading="isLoading"/>
        <a-table size="middle"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :columns="returnedColumns"
                 :data-source="allRoutes">
            <template #emptyText></template>
            <template #bodyCell="{column, record}">
                <template v-if="column.key==='descRu'">

                </template>
                <template v-if="column.key==='descKZ'">

                </template>
                <d-flex v-if="column.key === 'operations'" justify="center">
                    <d-table-href @push="showMap(record)">карта</d-table-href>
                    <d-table-href @push="showStations(record)">остановки</d-table-href>
                </d-flex>
            </template>
        </a-table>
        <d-table-drawer :drawer="drawer">
            <template #title>{{`Маршрут № ${+selectedItem?.routeNumber}`}}</template>
            <component :currentRoute="+selectedItem?.routeNumber" :is="currentComponent" />
        </d-table-drawer>
        {{authUser}}
    </d-flex>
</template>
<script setup lang="ts">
import {allRoutes, isAllRoutesLoading} from "@/modules/routes/stores/allRoutes.ts";
import DTableHref from "@/components/reus/DTableHref.vue";
import DSpin from "@/components/reus/DSpin.vue";
import {type Component, reactive, ref, shallowRef, watch} from "vue";
import {getAllRoutes} from "@/modules/routes/api/Index.ts";
import RouteIdStations from "@/modules/routes/views/RouteIdStations.vue";
import RouteIdPath from "@/modules/routes/views/RouteIdPath.vue";
import DTableDrawer from "@/components/reus/DTableDrawer.vue";
import {REG} from "@/constants.ts";
import {CURRENT_LOCALE, Languages} from "@/locales";
import {authUser} from "@/stores/user.ts";

const isLoading = ref(false)
const selectedItem = ref<any>(null)
const currentComponent = shallowRef<Component|null>(null)
const drawer = reactive({
    isOpen: false
})


const columns = [
    {
        title: '№',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
        ellipsis: true,
        width: 50
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: '№ маршрута',
        dataIndex: 'routeNumber',
        key: 'routeNumber',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Описание(рус)',
        dataIndex: 'descRu',
        key: 'descRu',
        align: 'center',
        ellipsis: true,
    },
    {
        title: 'Описание(каз)',
        dataIndex: 'descKZ',
        key: 'descKZ',
        align: 'center',
        ellipsis: true,
    },
    {
        title: 'Тариф город',
        dataIndex: 'tarifCity',
        key: 'tarifCity',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Кол-во зон',
        dataIndex: 'zones',
        key: 'zones',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Тариф безнал',
        dataIndex: 'tarifBeznal',
        key: 'tarifBeznal',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Тариф нал',
        dataIndex: 'tarifCahs',
        key: 'tarifCahs',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Операции',
        dataIndex: '',
        key: 'operations',
        align: 'center',
        ellipsis: true,
        width: 150
    },
]

const returnedColumns = columns.filter(a => {
    if(CURRENT_LOCALE.value === Languages.kz) {
        return a.key !== 'descRu'
    }
    if(CURRENT_LOCALE.value === Languages.ru) {
        return a.key !== 'descKZ'
    }
    else return a
})

function showMap(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = RouteIdPath
}

function showStations(record: any) {
    selectedItem.value = record
    drawer.isOpen = true
    currentComponent.value = RouteIdStations
}

watch(allRoutes, async () => {
    if(!allRoutes.value) {
        if(!isAllRoutesLoading.value) {
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
            isLoading.value = false
        }
    }
}, {immediate: true})
</script>


<style scoped>
.route__wrapper {
    position: relative;
}
</style>