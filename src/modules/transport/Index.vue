<template>
    <container-max>
        <da-spinner style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-if="isAllBusesInLoading" />
        <da-table v-if="allBuses" :data="{header: tableHeader, body: allBuses}" />
    </container-max>
</template>
<script setup lang="ts">
import DaTable from "@/components/reus/DaTable.vue";
import {watch} from "vue";
import {getAllBuses} from "@/modules/map/api";
import {Bus} from "@/models/Bus.ts";
import ContainerMax from "@/components/reus/containers/ContainerMax.vue";
import DaSpinner from "@/components/reus/DaSpinner.vue";
import {allBuses, isAllBusesInLoading} from "@/stores/buses.ts";

const tableHeader = ['№', 'Код ТС', 'Гос номер', 'Тариф город', 'Кол-во зон', 'Тарифы безнал', 'Тарифы нал', '№ маршрута', '№ смены', 'Статус', 'Статус дата']


watch(allBuses, async () => {
    if(!allBuses.length) {
        if(!isAllBusesInLoading.value) {
            isAllBusesInLoading.value = true
            const result: Bus[] = await getAllBuses({bin: '10540003043', region: 'REG_18'})
            const res = result.map(res => {
                return {
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