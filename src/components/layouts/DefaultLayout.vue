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
    gap: 10px;
    padding: 6px;
    background-color: rgba(0,0,0, .05);
    height: calc(100vh - var(--header-height) - 6px);
    overflow: hidden;
    position: relative;
    border: 1px solid red
}
.content {
    flex: 1;
    max-height: calc(100vh - var(--header-height) - 20px);
    overflow: auto;
}
</style>