<template>
    <d-flex gap="80px">
        <d-flex type="column" class="login">
            <a-input @input="isValidationFailed = false" :class="{err: isValidationFailed}"
                     v-model:value="userInfo.login" placeholder="Логин">
                <template #prefix>
                    <user-outlined/>
                </template>
            </a-input>
            <a-input-password
                    @input="isValidationFailed = false"
                    :class="{err: isValidationFailed}"
                    v-model:value="userInfo.password"
                    v-model:visible="isPasswordVisible"
                    placeholder="Пароль"
            />
            <a-button :loading="isLoading" @click="login" style="margin-top: 80px; " type="primary">Войти</a-button>
        </d-flex>
        <quick-auth @on-complete="getEmUid" :applicationIdentifier="APP_ID"/>
    </d-flex>
</template>
<script setup lang="ts">
import {UserOutlined} from "@ant-design/icons-vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {reactive, ref} from "vue";
import {authorize, loginByQr} from "@/modules/login/api";
import {authUser, IUser} from "@/stores/user.ts";
import router from "@/configs/router.ts";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import {APP_ID, REG} from "@/constants.ts";

const route = useRoute()
const isLoading = ref(false)
const isValidationFailed = ref(false)
const isPasswordVisible = ref(false)
const userInfo = reactive({
    login: '',
    password: ''
})

async function getEmUid(data: any){
    if(data) {
        const response = await loginByQr(data.uid)
        if(response && response.STR_LOGIN) {
            authUser.value = response
            REG.value = authUser.value.REG_ID
            await router.push('/routes/common')
        }
    }
}

async function login() {
    isLoading.value = true
    const res: IUser|null = await authorize(userInfo)
    isLoading.value = false
    if(res && res.STR_LOGIN && route.path === '/login') {
        authUser.value = res
        await router.push('/routes/common')
    } else message.error('Авторизация не удалась, попробуйте еще раз!')
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