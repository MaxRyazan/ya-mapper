<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import DText from "@/components/reus/texts/DText.vue";

const props = defineProps<{
    stations: string[],
    direction: 1|0|2
}>()
defineEmits<{
    (e: 'showStation', p: {name: string, direction: 1|0|2}):void
}>()


</script>

<template>
<d-flex type="column" align="start">
    <d-text weight="500" @click="$emit('showStation', {name: name, direction: props.direction})"
            cursor="pointer"
            class="card__text"
            v-for="name in stations" :key="name">{{name}}</d-text>
</d-flex>
</template>

<style scoped>
.card__text {
    border-radius: 6px;
    border: 1px solid var(--accent-color);
    width: 200px;
    padding: 6px;
    background-color: white;
    text-align: center;
    letter-spacing: 1px;
    &:hover {
        color: blue !important;
    }
}
</style>