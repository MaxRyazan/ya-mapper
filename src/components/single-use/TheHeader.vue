<template>
    <d-flex class="header">
        <user-info />
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import UserInfo from "@/components/single-use/UserInfo.vue";
</script>


<style scoped>
.header {
    background-color: white;
    padding-right: 250px;
    height: var(--header-height);
    width: 100%;
}
</style>