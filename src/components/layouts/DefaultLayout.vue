<script setup lang="ts">

import TheMainNav from "@/components/single-use/TheMainNav.vue";
</script>

<template>
<div class="def_layout">
    <the-main-nav />
    <div class="content">
        <router-view />
    </div>
</div>
</template>

<style scoped>
.def_layout {
    display: flex;
    width: 100%;
    min-height: calc(100vh - var(--header-height));
}
.content {
    flex: 1;
}
</style>