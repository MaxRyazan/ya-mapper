<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons-vue";

const props = defineProps<{
    link: any,
    isMenuExpanded: boolean
}>()
const route = useRoute()
const isSubExpanded = ref(false)


watch(() => route.query, () => {
    if(route.query) {
        if(props.link.subNavs) {
            if(props.link.subNavs.some((f:any) => f.tabQuery === route.query.tab)) {
                isSubExpanded.value = true
            }
        }
    }
})

</script>

<template>
    <d-flex style="font-size: 20px">
        <component :class="{'current-route': route.path.includes(link.to)}"
                   :title="link.title"
                   :is="link.icon"
                   class="da-icon"/>
        <d-flex>
            <span @click="isSubExpanded = !isSubExpanded" class="link-title" v-if="props.isMenuExpanded">{{link.title }}</span>
            <caret-up-outlined v-if="isSubExpanded && link.subNavs?.length" @click="isSubExpanded = false" />
            <caret-down-outlined v-if="!isSubExpanded && link.subNavs?.length" @click="isSubExpanded = true" />
        </d-flex>
    </d-flex>
    <d-flex class="sub-links-dropdown" align="start" type="column" v-if="props.link.subNavs && isSubExpanded">
        <router-link class="sub-link"
                     :class="{'sub-active': route.query.tab === sub.tabQuery}"
                     v-for="sub in props.link.subNavs"
                     :to="{path: route.path, query: {tab: sub.tabQuery}}"
                     :key="sub.tabQuery">-
            {{ sub.title }}
        </router-link>
    </d-flex>
</template>

<style scoped>
.sub-link {
    width: 100%;
    color: rgba(255, 255, 255, .5);
    text-decoration: none;
    &:hover{
        color: white;
    }
}
.sub-active {
    color: white !important;
}
.link-title {
    white-space: nowrap;
}
.sub-links-dropdown {
    margin-left: 10px;
    transition: .4s;
}
</style>