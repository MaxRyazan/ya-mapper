<script setup lang="ts">
</script>

<template>
    <d-flex align="start" class="def_layout-wrapper">
        <router-view/>
    </d-flex>
</template>

<style scoped>
.def_layout-wrapper {
    flex-grow: 1;
    height: 100vh;
    overflow-y: auto;
    & > * {
        flex-grow: 1;
    }
}
</style>