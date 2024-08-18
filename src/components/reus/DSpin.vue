<script setup lang="ts">
const props = defineProps<{
    isLoading: boolean
}>()
</script>

<template>
    <a-spin size="large" class="route__spinner" v-if="props.isLoading">
        <template #tip>Идёт загрузка...</template>
    </a-spin>
</template>

<style scoped>
.route__spinner {
    position: absolute;
    top: 50%;
    right: 45%;
    transform: translate(-50%, -45%);
}
</style>