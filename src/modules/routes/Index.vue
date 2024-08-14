<template>
    <d-flex class="route__wrapper" type="column">
        <a-spin size="large" class="route__spinner" v-if="isLoading"/>
        <a-table size="middle"
                 :columns="columns"
                 :pagination="false"
                 :data-source="allRoutes">
            <template #emptyText></template>
            <template #bodyCell="{column, record}">
                <template v-if="column.key === 'operations'">
                    <div style="display: flex; gap: 10px">
                        <router-link :to="`/routes/${record?.routeNumber!}`">схема</router-link>
                        <router-link :to="`/routes/stations/${record?.routeNumber!}`">остановки</router-link>
                    </div>
                </template>
            </template>
        </a-table>
    </d-flex>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {getAllRoutes} from "@/modules/routes/api/Index.ts";
import {allRoutes, isAllRoutesLoading} from "@/modules/routes/stores/allRoutes.ts";

const isLoading = ref(false)


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

watch(allRoutes, async () => {
    if(!allRoutes.value) {
        if(!isAllRoutesLoading.value) {
            isLoading.value = true
            const response = await getAllRoutes({bin: '10540003043', region: 'REG_18'})
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
.route__spinner {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
}
</style>