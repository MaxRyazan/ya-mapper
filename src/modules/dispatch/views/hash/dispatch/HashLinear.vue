<template>
<div>

</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()

const currentRoute = ref()

onMounted(() => {
    currentRoute.value = route.query.route
})
</script>


<style scoped>

</style>