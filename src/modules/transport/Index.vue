<template>
    <container-max>
        <da-table v-if="ALL_BUSES" :data="{header: tableHeader, body: ALL_BUSES}" />
    </container-max>
</template>
<script setup lang="ts">
import DaTable from "@/components/reus/DaTable.vue";
import {onMounted, ref} from "vue";
import {getAllBuses} from "@/modules/map/api";
import {Bus} from "@/models/Bus.ts";
import ContainerMax from "@/components/reus/containers/ContainerMax.vue";

const ALL_BUSES = ref<Bus[]>([])
const tableHeader = ['№', 'Код ТС', 'Гос номер', 'Тариф город', 'Кол-во зон', 'Тарифы безнал', 'Тарифы нал', '№ маршрута', '№ смены', 'Статус', 'Статус дата']


onMounted(async () => {
    const result: Bus[] = await getAllBuses({bin: '10540003043', region: 'REG_18'})
    ALL_BUSES.value = result.map(res => {
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
})
</script>

<style scoped>

</style>