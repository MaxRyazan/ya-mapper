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
        <a-modal v-model:open="superAdminModalOpen" title="Выберите регион, с которым вы хотите работать" @ok="confirmModal">
            <d-flex>
                Регион:
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="selectRegion">
                            <a-menu-item key="05">
                                05
                            </a-menu-item>
                            <a-menu-item key="11">
                                11
                            </a-menu-item>
                            <a-menu-item key="13">
                                13
                            </a-menu-item>
                            <a-menu-item key="15">
                                15
                            </a-menu-item>
                            <a-menu-item key="18">
                                18
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        {{selectedRegionBySuperAdmin}}
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
            </d-flex>
        </a-modal>
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
import {APP_ID, REG, superAdminModalOpen} from "@/constants.ts";
import {IRoles} from "@/enums.ts";
import {DownOutlined} from "@ant-design/icons-vue";

const selectedRegionBySuperAdmin = ref()
const route = useRoute()
const isLoading = ref(false)
const isValidationFailed = ref(false)
const isPasswordVisible = ref(false)
const userInfo = reactive({
    login: '',
    password: ''
})

async function selectRegion (e: {key: string}) {
    REG.value = e.key
    if(REG.value === '15') {
        authUser.value!.BIN = '210140006411'
    }
    authUser.value!.REG_ID = REG.value
    superAdminModalOpen.value = false
    await router.push('/routes/common')
}

function confirmModal() {
    authUser.value!.REG_ID = selectedRegionBySuperAdmin.value
}

async function getEmUid(data: any){
    if(data) {
        const response = await loginByQr(data.uid)
        if(response && response.STR_LOGIN) {
            authUser.value = response
            setUserRoleSuperAdmin()
            if(authUser.value.Role === IRoles.superAdmin) {
                superAdminModalOpen.value = true
            } else {
                REG.value = authUser.value.REG_ID
                await router.push('/routes/common')
            }
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

function  setUserRoleSuperAdmin() {
    authUser.value!.Role = IRoles.superAdmin
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