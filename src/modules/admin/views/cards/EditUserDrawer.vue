<template>
    <a-drawer v-if="user"
              v-model:open="drawer.isOpen"
              width="700px"
              @close="emit('close-drawer')"
              placement="right">
        <template #title>
            <d-text size="18px" color="rgba(0,0,0,.5)">{{ user.FIO }}</d-text>
        </template>
        <d-flex style="height: 100%;" type="column" justify="space-between" align="start">
            <d-flex type="column" style="width: 100%;" align="stretch">
                <d-flex justify="space-between">
                    <d-text>EmUID</d-text>
                    <a-input style="width: 50%;" class="constant-data" readonly v-model:value="copy.EmUID"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>IIN</d-text>
                    <a-input style="width: 50%" v-model:value="copy.IIN"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>FIO</d-text>
                    <a-input style="width: 50%" v-model:value="copy.FIO"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>Phone</d-text>
                    <a-input class="constant-data" readonly style="width: 50%;" v-model:value="copy.LOGIN"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>Valid</d-text>
                    <a-checkbox style="width: 50%" v-model:checked="copy.Valid"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>Role</d-text>
                    <a-input style="width: 50%" v-model:value="copy.Role"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>REG_ID</d-text>
                    <a-input style="width: 50%" v-model:value="copy.REG_ID"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>BIN</d-text>
                    <a-input style="width: 50%" v-model:value="copy.BIN"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>STR_LOGIN</d-text>
                    <a-input style="width: 50%" v-model:value="copy.STR_LOGIN"/>
                </d-flex>
                <d-flex justify="space-between">
                    <d-text>STR_PASS</d-text>
                    <a-input style="width: 50%" v-model:value="copy.STR_PASS"/>
                </d-flex>
            </d-flex>
            <a-button @click="edit" type="primary">Сохранить изменения</a-button>
        </d-flex>
    </a-drawer>
</template>
<script setup lang="ts">
import DText from "@/components/reus/texts/DText.vue";
import {IUser} from "@/stores/user.ts";
import {ref, watch} from "vue";
import {editUser} from "@/modules/admin/api";

const emit = defineEmits<{
    (e: 'close-drawer'):void
}>()
const props = defineProps<{
    user: IUser,
    drawer: any
}>()

const copy = ref(props.user)

async function edit() {
    const resp = await editUser(copy.value)
    console.log(resp)
}

watch(() => props.user, () => {
    copy.value = props.user
}, {immediate: true})
</script>


<style scoped>
.constant-data {
    color: rgba(0,0,0,.5);
    &:hover{
        border: 1px solid rgb(217, 217, 217) !important;
    }
    &:active {
        border: 1px solid rgb(217, 217, 217) !important;
    }
    &:focus {
        border: 1px solid rgb(217, 217, 217) !important;
    }
}
</style>