<template>
    <d-flex class="footer" justify="end">
        <d-text size="16px" weight="500">Alem Pay &copy; {{dayjs().year()}}</d-text>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from '@/components/reus/html-containers/DFlex.vue'
import dayjs from "dayjs";
import DText from "@/components/reus/texts/DText.vue";

</script>


<style scoped>
.footer {
    padding: 0 2%;
    width: 100%;
    height: 60px !important;
    background-color: white;
}
</style>