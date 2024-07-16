<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const props = defineProps<{
    link: any,
    isMenuExpanded: boolean
}>()
const route = useRoute()
const router = useRouter()
const isSubExpanded = ref(false)

function openSubLinks() {
    if(props.link.subNavs) {
        router.push({ path: props.link.to, hash: props.link.subNavs[0].href })
    } else {
        router.push({ path: props.link.to })
    }
    isSubExpanded.value = !isSubExpanded.value
}

watch(() => route.path, () => {
    if(route.path !== props.link.to) {
        isSubExpanded.value = false
    }
})

watch(() => props.isMenuExpanded, () => {
    isSubExpanded.value = props.isMenuExpanded;
})

</script>

<template>
    <d-flex style="font-size: 20px;">
        <component :class="{'current-route': route.path.includes(link.to)}"
                   :title="link.title"
                   :is="link.icon"
                   class="da-icon"/>
        <span class="link-title" v-if="props.isMenuExpanded" @click="openSubLinks">{{link.title }}</span>
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