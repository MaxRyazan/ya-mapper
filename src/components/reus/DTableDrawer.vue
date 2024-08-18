<script setup lang="ts">
import {RightOutlined} from "@ant-design/icons-vue";
import DText from "@/components/reus/texts/DText.vue";

const props = defineProps<{
    drawer: {
        isOpen: boolean
    }
}>()
</script>

<template>
    <a-drawer :get-container="false"
              destroyOnClose
              style="border-radius: 8px"
              width="100%"
              :style="{ position: 'absolute' }"
              v-model:open="props.drawer.isOpen">
        <template #closeIcon>
            <div style="width: 40px;height: 22px">
                <right-outlined style="font-size: 20px;"/>
            </div>
        </template>
        <template #title>
            <d-text weight="700" color="rgba(0,0,0,.45)">
                <slot name="title" />
            </d-text>
        </template>
        <slot />
    </a-drawer>
</template>