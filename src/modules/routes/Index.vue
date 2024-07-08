<template>
    <div>
        <d-text color="accent" size="22px" weight="600">Список маршрутов</d-text>
        <da-table style="margin-top: 28px;" :data="{header: table.header, body: table.body}">
            <template #operations="{record}">
                <router-link :to="`/routes/${record.routeNum}`">схема</router-link>
                <button>остановки</button>
            </template>
        </da-table>
    </div>
</template>
<script setup lang="ts">
import DaTable from "@/components/reus/DaTable.vue";
import DText from "@/components/reus/texts/DText.vue";
import {onMounted, reactive} from "vue";
import {getAllRoutes} from "@/modules/routes/api/Index.ts";

const table = reactive({
    header: ['№', 'Тип', '№ маршрута', "Описание(рус)", "Описание(каз)", "Тариф город", "Кол-во зон", "Тариф безнал", "Тариф нал",  "Операции"],
    body: []
})

onMounted(async () => {
    const response = await getAllRoutes({bin: '10540003043', region: 'REG_18'})
    table.body = response.map((a, idx) => {
        return {
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
})
</script>


<style scoped>

</style>