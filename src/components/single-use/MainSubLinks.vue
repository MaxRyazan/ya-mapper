<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";

const props = defineProps<{
    link: any,
    isMenuExpanded: boolean
}>()
const route = useRoute()
const isSubExpanded = ref(false)
</script>

<template>
    <d-flex style="font-size: 20px;">
        <component :class="{'current-route': route.path.includes(link.to)}"
                   :title="link.title"
                   :is="link.icon"
                   class="da-icon"/>
        <span class="link-title" v-if="props.isMenuExpanded" @click="isSubExpanded = !isSubExpanded">{{link.title }}</span>
    </d-flex>
    <d-flex class="sub-links-dropdown" align="start" type="column" v-if="props.link.subNavs && isSubExpanded">
        <router-link class="sub-link"
                     :class="{'sub-active': route.hash === sub.href}"
                     :to="sub.href"
                     v-for="sub in props.link.subNavs" :key="sub.href">-
            {{ sub.title }}
        </router-link>
    </d-flex>
</template>

<style scoped>
.sub-link {
    color: rgba(255, 255, 255, .5);
    text-decoration: none;
}
.sub-active {
    color: var(--primary-color) !important;
}
.link-title {
    white-space: nowrap;
}
.sub-links-dropdown {
    margin-left: 10px;
    transition: .4s;
}
</style>