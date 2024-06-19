<script setup lang="ts">
import {onMounted} from "vue";

const props = defineProps<{
    data: {
        header: string[],
        body: Object[]
    }
}>()

onMounted(() => {
    console.log(props.data)
})
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="head in data.header" :key="head">{{head}}</th>
            </tr>
        </thead>
        <tbody>
            <tr :class="{odd: idx % 2 === 0}" v-for="(obj, idx) in data.body" :key="idx">
                <td>{{idx + 1}}</td>
                <td v-for="[key, value] in Object.entries(obj)" :key="key">{{value}}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border: 2px solid var(--borders-color);
    border-radius: 8px !important;
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    & thead {
        background: var(--accent-gradient-color);
        color: white;
        & th {
            text-align: center;
            padding: 4px 6px;
            border: 1px solid var(--accent-color);
        }
    }
    & tbody {
        & tr:hover {
            background-color: var(--accent-color-hover);
            color: white;
        }
        & td {
            text-align: center;
            padding: 4px 6px;
            border: 1px solid var(--accent-color);
        }
    }
}
.odd {
    background-color: #f2f2f2;
}
</style>