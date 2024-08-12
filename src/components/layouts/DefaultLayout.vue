<template>
    <d-flex align="start" class="def_layout-wrapper">
        <router-view/>
    </d-flex>
</template>
<script setup lang="ts">
</script>


<style scoped>
.def_layout-wrapper {
    flex-grow: 1;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
    & > * {
        flex-grow: 1;
    }
}
</style>