<template>
    <d-flex type="column">
        <d-flex gap="0" style="width: 99%">
            <d-text v-for="tab in tabs" :key="tab.path"
                    cursor="pointer"
                    size="18px"
                    @click="changeComponent(tab)"
                    class="tab">{{tab.tabName}}</d-text>
        </d-flex>
        <component :is="currentComponent" />
    </d-flex>
</template>
<script setup lang="ts">
import DText from "@/components/reus/texts/DText.vue";
import {reactive, shallowRef} from "vue";
import DispatchMap from "@/modules/dispatch/views/tabs/DispatchMap.vue";
import DispatchLinear from "@/modules/dispatch/views/tabs/DispatchLinear.vue";

const currentComponent = shallowRef(DispatchMap)

const tabs = reactive([
    {tabName: 'Карта', path: 'tab=map', component: shallowRef(DispatchMap)},
    {tabName: 'Линейный', path: 'tab=linear', component: shallowRef(DispatchLinear)},
])

function changeComponent(tab: any) {
    currentComponent.value = tab.component
}

</script>


<style scoped>
.tab {
    padding: 10px;
}
</style>