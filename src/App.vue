<template>
    <the-header />
    <div style="display: flex">
        <router-view />
    </div>
</template>
<script setup lang="ts">
import TheHeader from "@/components/single-use/TheHeader.vue";
</script>