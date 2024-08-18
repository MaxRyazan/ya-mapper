<template>
    <d-flex class="header">
        <div style="width: calc(100% - 220px); padding-left: 2%; overflow-x: auto" id="header-id">
            <slot />
        </div>
        <user-info />
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import UserInfo from "@/components/single-use/UserInfo.vue";
import {onMounted} from "vue";

onMounted(() => {
    const element = document.querySelector("#header-id");
    if(element) {
        element.addEventListener('wheel', (event: any) => {
            element.scrollBy({
                left: event.deltaY < 0 ? -30 : 30,
            });
        });
    }
})
</script>


<style scoped>
.header {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    position: relative;
    background-color: white;
    height: var(--header-height);
    max-width: 100%;
    width: 100%;
}
</style>