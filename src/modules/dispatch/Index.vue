<template>
    <page-sample :page-nav="dispatchNav">
        <template #content>
            <router-view></router-view>
        </template>
    </page-sample>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import PageSample from "@/components/samples/PageSample.vue";
import {GlobalModuleInnerNav} from "@/global-types.ts";

const dispatchNav = reactive<GlobalModuleInnerNav[]>([
    {title: 'Общее', path: '/dispatch'},
    {title: 'Мониторинг', path: '/dispatch/monitor'},
    {title: 'Путь', path: '/dispatch/path'},
    {title: 'Отклонения', path: '/dispatch/vectors'},
    {title: 'Обороты', path: '/dispatch/screw'},
    {title: 'Расписание', path: '/dispatch/list'},
    {title: 'Выходные дни', path: '/dispatch/weekend'},
    {title: 'Прохождение узлов', path: '/dispatch/nodes'},
    {title: 'График движения', path: '/dispatch/graph-map'},
    {title: 'График, остановка', path: '/dispatch/graph-stations'},
    {title: 'График, рейс', path: '/dispatch/graph-reis'},
    {title: 'Прогноз по остановке', path: '/dispatch/future'},
    {title: 'Сообщение на табло', path: '/dispatch/message'},
])

</script>

<style scoped>

</style>