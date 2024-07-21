<template>
    <d-flex style="padding: 20px" type="column" gap="40px">
        <d-text size="26px">Транспорт</d-text>
        <a-table size="small"
                 :columns="columns"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :data-source="allBuses">
        </a-table>
    </d-flex>

</template>
<script setup lang="ts">
import {watch} from "vue";
import {getAllBuses} from "@/modules/map/api";
import {Bus} from "@/models/Bus.ts";
import {allBuses, isAllBusesInLoading} from "@/stores/buses.ts";
import DText from "@/components/reus/texts/DText.vue";



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




watch(allBuses, async () => {
    if(!allBuses.length) {
        if(!isAllBusesInLoading.value) {
            isAllBusesInLoading.value = true
            const result: Bus[] = await getAllBuses({bin: '10540003043', region: 'REG_18'})
            const res = result.map((res, idx) => {
                return {
                    KEY: idx + 1,
                    ID: res.ID,
                    GOS_NUM: res.GOS_NUM,
                    TAR_CITY: res.TAR_CITY,
                    ZONES: res.ZONES,
                    TAR_BEZ: res.TAR_BEZ,
                    TAR_CASH: res.TAR_CASH,
                    ROUTE: res.ROUTE,
                    SMENA: res.SMENA,
                    STATUS: (res.STATUS === 'True' ? 'Рабочий' : 'Не рабочий'),
                    GPS_IMEI: res.GPS_IMEI,
                }
            })
            Object.assign(allBuses, res)
            isAllBusesInLoading.value = false
        }
    }
}, {immediate: true})

</script>

<style scoped>

</style>