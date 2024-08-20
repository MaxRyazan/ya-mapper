<template>
    <page-sample :page-nav="subNav">
        <template #content>
            <router-view></router-view>
        </template>
    </page-sample>
</template>
<script setup lang="ts">
import PageSample from "@/components/samples/PageSample.vue";
import {reactive} from "vue";
import {GlobalModuleInnerNav} from "@/global-types.ts";

const subNav = reactive<GlobalModuleInnerNav[]>([
    {title: 'Общее', path: '/admin/common'},
])
</script>