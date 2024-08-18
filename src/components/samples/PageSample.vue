<template>
    <d-flex gap="20px" align="start" class="page-sample" type="column">
        <the-header>
            <a-tabs v-model:activeKey="activeKey"
                    :tab-position="mode"
                    type="card"
                    @tabClick="clickTab"
                    @tabScroll="tabScroll">
                <a-tab-pane v-for="(tab, idx) in props.pageNav" :key="idx" :tab="tab.title"></a-tab-pane>
            </a-tabs>
        </the-header>
        <d-flex class="tab-content">
            <slot name="content" />
        </d-flex>
        <the-footer style="width: 100%;"/>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from '@/components/reus/html-containers/DFlex.vue'
import TheHeader from "@/components/single-use/TheHeader.vue";
import {onMounted, ref} from "vue";
import {TabsProps} from "ant-design-vue";
import {useRoute, useRouter} from "vue-router";
import TheFooter from "@/components/single-use/TheFooter.vue";
import {GlobalModuleInnerNav} from "@/global-types.ts";

const props = defineProps<{
    pageNav: GlobalModuleInnerNav[]
}>()
const route = useRoute()
const mode = ref<TabsProps['tabPosition']>('top');
const activeKey = ref(0);
const router = useRouter()


function clickTab(tabNumber: number) {
    const tab = props.pageNav[tabNumber]
    router.push(tab.path)
}

function tabScroll(){}

onMounted(() => {
    activeKey.value = props.pageNav.findIndex(prop => prop.path === route.path)
})
</script>

<style scoped>
.tab-content {
    border-radius: 8px;
    background-color: white;
    width: 96%;
    flex-grow: 1;
    margin: 0 auto;
    height: calc(100vh - 160px);
    & > * {
        height: 100%;
    }
}
.page-sample {
    position: relative;
    width: 100%;
}
:deep(.ant-tabs-tab) {
    padding: 8px !important;
}
</style>