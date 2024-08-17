<template>
    <d-flex style="font-size: 22px; flex-wrap: nowrap">
        <component :class="{'current-route': route.path.includes(link.to)}"
                   :title="link.title"
                   :is="link.icon"
                   class="da-icon"/>
        <d-flex>
            <span @click="isSubExpanded = !isSubExpanded"
                  class="link-title"
                  v-if="props.isMenuExpanded">{{link.title }}</span>
            <caret-up-outlined v-if="isSubExpanded && link.subNavs?.length" @click="isSubExpanded = false" />
            <caret-down-outlined v-if="!isSubExpanded && link.subNavs?.length" @click="isSubExpanded = true" />
        </d-flex>
    </d-flex>
</template>
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
<style scoped>
.link-title {
    white-space: nowrap;
}
.da-icon {
    width: 26px;
    height: 26px;
}
</style>