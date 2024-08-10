<template>
    <d-flex type="column" class="login">
        <a-input @input="isValidationFailed = false" :class="{err: isValidationFailed}"
                 v-model:value="userInfo.login" placeholder="Логин">
            <template #prefix>
                <user-outlined />
            </template>
        </a-input>
        <a-input-password
                @input="isValidationFailed = false"
                :class="{err: isValidationFailed}"
                v-model:value="userInfo.password"
                v-model:visible="isPasswordVisible"
                placeholder="Пароль"
        />
        <a-button @click="login" style="margin-top: 40px; padding: 0 30px" type="primary">Войти</a-button>
    </d-flex>
</template>
<script setup lang="ts">
import {UserOutlined} from "@ant-design/icons-vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {reactive, ref} from "vue";

const isValidationFailed = ref(false)
const isPasswordVisible = ref(false)
const userInfo = reactive({
    login: '',
    password: ''
})

function login() {

}
</script>
<style scoped>
.login {
    padding: 20px;
    width: 400px;
    height: 400px;
}
</style>