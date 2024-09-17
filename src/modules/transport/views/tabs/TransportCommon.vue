<template>
    <d-flex type="column" gap="40px">
        <a-table size="small"
                 :columns="columns"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :data-source="allBuses">
        </a-table>
    </d-flex>

</template>
<script setup lang="ts">
import {allBuses} from "@/stores/buses.ts";
import {useGetBuses} from "@/hooks/useGetAllBuses.ts";
import {onMounted} from "vue";

const columns = [
    {
        title: '№',
        dataIndex: 'KEY',
        key: 'KEY',
        align: 'center',
        ellipsis: true,
        width: 50
    },
    {
        title: 'Код ТС',
        dataIndex: 'ID',
        key: 'ID',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Гос номер',
        dataIndex: 'GOS_NUM',
        key: 'GOS_NUM',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Тариф город',
        dataIndex: 'TAR_CITY',
        key: 'TAR_CITY',
        align: 'center',
        ellipsis: true,
    },
    {
        title: 'Кол-во зон',
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
        dataIndex: 'ZONES',
        key: 'ZONES',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Тарифы безнал',
        dataIndex: 'TAR_BEZ',
        key: 'TAR_BEZ',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: 'Тарифы нал',
        dataIndex: 'TAR_CASH',
        key: 'TAR_CASH',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: '№ маршрута',
        dataIndex: 'ROUTE',
        key: 'ROUTE',
        align: 'center',
        ellipsis: true,
        width: 150
    },
    {
        title: '№ смены',
        dataIndex: 'SMENA',
        key: 'SMENA',
        align: 'center',
        ellipsis: true,
        width: 150
    },
    {
        title: 'Статус',
        dataIndex: 'STATUS',
        key: 'STATUS',
        align: 'center',
        ellipsis: true,
        width: 150
    },
    {
        title: 'Статус дата',
        dataIndex: 'GPS_IMEI',
        key: 'GPS_IMEI',
        align: 'center',
        ellipsis: true,
        width: 150
    },
]

onMounted(async () => {
    await useGetBuses()
})
</script>

<style scoped>

</style>