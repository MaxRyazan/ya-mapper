<template>
    <d-flex type="column" align="start">
        <a-table size="small"
                 :columns="columns"
                 :pagination="{defaultPageSize: 14, showSizeChanger: true, pageSizeOptions: ['10', '14', '20', '50']}"
                 :data-source="dataSource">

        </a-table>
    </d-flex>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GetLinesByRouteResponse} from "@/modules/map/types/api-models.ts";
import {getLinesByRegion} from "@/modules/map/api/index.ts";
import {StationOfRoute} from "@/modules/routes/types/Index.ts";

const props = defineProps<{
    currentRoute: number
}>()

const ascBusStations = ref<StationOfRoute[]>([])
const descBusStations = ref<StationOfRoute[]>([])
const dataSource = ref<StationOfRoute[]>([])

const columns = [
    {
        title: '№',
        dataIndex: 'KEY',
        key: 'KEY',
        align: 'center',
        ellipsis: true,
        width: 50,
    },
    {
        title: 'Id остановки',
        dataIndex: 'ID',
        key: 'ID',
        align: 'center',
        ellipsis: true,
        width: 150,
        sorter: {
            compare: (a: StationOfRoute, b: StationOfRoute) => +b.ID - +a.ID
        },
    },
    {
        title: 'Направление',
        dataIndex: 'DIRECTION_TEXT',
        key: 'DIRECTION_TEXT',
        align: 'center',
        ellipsis: true,
        width: 150,
        sorter: {
            compare: (a: StationOfRoute, b: StationOfRoute) => +b.DIRECTION - +a.DIRECTION
        },
    },
    {
        title: 'Остановка(кз)',
        dataIndex: 'NAME_KZ',
        key: 'NAME_KZ',
        align: 'center',
        ellipsis: true,
    },
    {
        title: 'Остановка(ру)',
        dataIndex: 'NAME_RU',
        key: 'NAME_RU',
        align: 'center',
        ellipsis: true,
    },
]


onMounted(async () => {
    const ascResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 0)
    const descResponse: GetLinesByRouteResponse[] | undefined = await getLinesByRegion(props.currentRoute, 1)

    if(ascResponse){
        ascBusStations.value = ascResponse.map((r: GetLinesByRouteResponse) => {
            return {
                KEY: null,
                NAME_RU: r.NAME_RU,
                NAME_KZ: r.NAME_KZ,
                ID: r.ST_ID,
                DIRECTION: r.DIRECTION,
                DIRECTION_TEXT: 'Прямое'
            }
        })
        dataSource.value = [...ascBusStations.value]
    }
    if(descResponse) {
        descBusStations.value = descResponse.map((r: GetLinesByRouteResponse) => {
            return {
                KEY: null,
                NAME_RU: r.NAME_RU,
                NAME_KZ: r.NAME_KZ,
                ID: r.ST_ID,
                DIRECTION: r.DIRECTION,
                DIRECTION_TEXT: 'Обратное'
            }
        })
        dataSource.value = [...dataSource.value, ...descBusStations.value]
        dataSource.value.forEach((d, idx) => d.KEY = idx+1)
    }

})
</script>