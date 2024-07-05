<script setup lang="ts">

interface DTextProps {
    tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'strong',
    cursor?: 'default' | 'pointer' | 'text' | 'not-allowed'
}

const props = withDefaults(defineProps<DTextProps>(), {
    tag: 'span',
    cursor: 'default'
})
</script>

<template>
    <component :is="props.tag"
               :style="{cursor: props.cursor}"
               :class="{strong: props.tag === 'strong'}">
        <slot/>
    </component>
</template>

<style scoped>
.strong {
    font-weight: bold;
}
</style>