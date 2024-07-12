<template>
    <div>
        <d-text color="accent" size="22px" weight="600">Список маршрутов</d-text>
        <da-spinner style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-if="isLoading" />
        <da-table v-else style="margin-top: 28px;" :data="{header: table.header, body: table.body}">
            <template #operations="{record}">
                <router-link :to="`/routes/${record?.routeNumber!}`">схема</router-link>
                <button>остановки</button>
            </template>
        </da-table>
    </div>
</template>
<script setup lang="ts">
import DaTable from "@/components/reus/DaTable.vue";
import DText from "@/components/reus/texts/DText.vue";
import {onMounted, reactive, ref} from "vue";
import {getAllRoutes} from "@/modules/routes/api/Index.ts";
import DaSpinner from "@/components/reus/DaSpinner.vue";

const isLoading = ref(false)
const table = reactive<any>({
    header: ['№', 'Тип', '№ маршрута', "Описание(рус)", "Описание(каз)", "Тариф город", "Кол-во зон", "Тариф безнал", "Тариф нал",  "Операции"],
    body: []
})

onMounted(async () => {
    isLoading.value = true
    const response = await getAllRoutes({bin: '10540003043', region: 'REG_18'})
    table.body = response.map(a => {
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
    isLoading.value = false
})
</script>


<style scoped>

</style>