<template>
    <d-flex gap="0" style="position: relative; background-color: rgba(0,0,0, .08);">
        <the-main-nav />
        <default-layout />
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import TheMainNav from "@/components/single-use/TheMainNav.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import {onMounted} from "vue";
import {CURRENT_LOCALE} from "@/locales";

onMounted(() => {
    const lang = localStorage.getItem('alempay-lang')
    if(lang) {
        CURRENT_LOCALE.value = lang
    }
})
</script>
<style scoped>

</style>