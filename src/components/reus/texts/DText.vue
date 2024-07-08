<script setup lang="ts">

interface DTextProps {
    tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'strong',
    cursor?: 'default' | 'pointer' | 'text' | 'not-allowed',
    size?: string,
    color?: 'accent' | string,
    weight?: string
}

const props = withDefaults(defineProps<DTextProps>(), {
    tag: 'span',
    cursor: 'default',
    size: '14px',
    color: '#111111',
    weight: '400'
})
</script>

<template>
    <component :is="props.tag"
               :style="{
                    cursor: props.cursor,
                    fontSize: props.size,
                    color: props.color === 'accent' ? 'var(--accent-color)' : props.color,
                    fontWeight: props.weight
               }"
               :class="{strong: props.tag === 'strong'}">
        <slot/>
    </component>
</template>

<style scoped>
.strong {
    font-weight: bold;
}
</style>