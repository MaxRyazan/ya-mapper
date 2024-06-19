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
    ALL_BUSES.value = await getAllBuses({bin: '10540003043', region: 'REG_18'})
    console.log(ALL_BUSES.value)
})
</script>

<style scoped>

</style>