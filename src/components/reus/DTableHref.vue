<script setup lang="ts">
import DText from "@/components/reus/texts/DText.vue";

const emits = defineEmits<{
    (e: 'push'):void
}>()
</script>

<template>
    <d-text @click="emits('push')" cursor="pointer" class="dispatch-table__href" color="#1677FF">
        <slot />
    </d-text>
</template>

<style scoped>
.dispatch-table__href {
    &:hover {
        color: hsl(215 100 74) !important;
    }
}
</style>