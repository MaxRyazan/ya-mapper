<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";

const props = defineProps<{
    prevLocationName: string
    linkTo: string
    currentLinkName: string
}>()
</script>

<template>
    <d-flex gap="0">
        <router-link class="da-breadcrumbs" :to="props.linkTo">
            {{ props.prevLocationName }}
        </router-link>
        <p class="da-breadcrumbs__p">{{ props.currentLinkName }}</p>
    </d-flex>
</template>

<style scoped>
.da-breadcrumbs {
    text-decoration: none;
    margin: 0;
    padding: 0;
    color: var(--primary-gray);
}

.da-breadcrumbs__p {
    margin: 0;
    color: var(--primary-gray);
    cursor: default
}
</style>