<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";

const props = defineProps<{
    stations: string[],
    direction: 1|0
}>()
defineEmits<{
    (e: 'showStation', p: {name: string, direction: 1|0}):void
}>()


</script>

<template>
<d-flex type="column" align="start">
    <d-text @click="$emit('showStation', {name: name, direction: props.direction})"
            v-for="name in stations" :key="name">{{name}}</d-text>
</d-flex>
</template>

<style scoped>

</style>