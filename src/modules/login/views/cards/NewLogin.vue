<template>
    <d-flex gap="80px">
        <d-flex type="column" class="login">
            <a-input @input="isValidationFailed = false" :class="{err: isValidationFailed}"
                     v-model:value="userInfo.STR_LOGIN" placeholder="Логин">
                <template #prefix>
                    <user-outlined/>
                </template>
            </a-input>
            <a-input-password
                    @input="isValidationFailed = false"
                    :class="{err: isValidationFailed}"
                    v-model:value="userInfo.STR_PASS"
                    v-model:visible="isPasswordVisible"
                    placeholder="Пароль"
            />
            <a-button @click="login" style="margin-top: 80px; " type="primary">Войти</a-button>
        </d-flex>
        <the-qr />
    </d-flex>
</template>
<script setup lang="ts">
import {UserOutlined} from "@ant-design/icons-vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {reactive, ref} from "vue";
import TheQr from "@/modules/login/views/cards/TheQr.vue";
import {authorize} from "@/modules/login/api";
import {authUser, IUser} from "@/stores/user.ts";
import router from "@/configs/router.ts";

const isValidationFailed = ref(false)
const isPasswordVisible = ref(false)
const userInfo = reactive({
    STR_LOGIN: '',
    STR_PASS: ''
})

async function login() {
    const res: IUser|null = await authorize(userInfo)
    if(res && res.STR_LOGIN) {
        authUser.value = res
        await router.push('/routes')
    }
}
</script>
<style scoped>
.login {
    padding: 20px;
    min-width: 400px;
    & > * {
        height: 100%;
        width: 100%;
    }
}
</style>