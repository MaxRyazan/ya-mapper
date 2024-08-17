<template>
    <d-flex align="start" class="def_layout-wrapper">
        <router-view/>
    </d-flex>
</template>
<script setup lang="ts">
</script>


<style scoped>
.def_layout-wrapper {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding: 0;
    & > * {
        flex-grow: 1;
    }
}
</style>