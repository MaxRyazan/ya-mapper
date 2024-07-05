<template>
<div style="display: flex"
     :style="{
        alignItems: props.align,
        justifyContent: props.justify,
        flexDirection: props.type,
        gap: props.gap
     }">
	<slot />
</div>
</template>

<script setup lang="ts">
export interface IProps {
    align: 'center' | 'start' | 'end',
    justify: 'center' | 'start' | 'end' | 'space-between',
    type: "row" | 'column' | 'column-reverse',
    gap: string
}

const props = withDefaults(defineProps<IProps>(), {
	align: 'center',
	justify: "start",
	type: "row",
    gap: '10px'
})
</script>
<style scoped>

</style>