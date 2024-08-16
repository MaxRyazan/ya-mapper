<template>
    <d-flex align="start">
        <d-flex type="column" class="registration">
        <a-input @input="isLoginNotValid = false" title="Логин" :class="{err: isLoginNotValid}"
                 v-model:value="userInfo.login" placeholder="Логин">
        </a-input>
        <a-input @input="isPhoneNotValid = false" type="phone" title="Телефон" :class="{err: isPhoneNotValid}"
                 v-model:value="userInfo.phone" placeholder="Телефон в формате +79507505050">
        </a-input>
        <a-input @input="isFioNotValid = false" title="Фамилия" :class="{err: isFioNotValid}"
                 v-model:value="userInfo.name" placeholder="Фамилия">
            <template #prefix>
                <user-outlined/>
            </template>
        </a-input>
        <a-input @input="isFioNotValid = false" title="Имя" :class="{err: isFioNotValid}"
                 v-model:value="userInfo.surname" placeholder="Имя">
            <template #prefix>
                <user-outlined/>
            </template>
        </a-input>
        <a-input @input="isFioNotValid = false" title="Отчество" :class="{err: isFioNotValid}"
                 v-model:value="userInfo.patronymic" placeholder="Отчество">
            <template #prefix>
                <user-outlined/>
            </template>
        </a-input>
        <a-input-password
                title="Пароль"
                @input="isValidationFailed = false"
                :class="{err: isValidationFailed}"
                v-model:value="userInfo.password"
                v-model:visible="isPasswordVisible"
                placeholder="Пароль"
        />
        <a-input-password
                title="Повторите пароль"
                @input="isValidationFailed = false"
                :class="{err: isValidationFailed}"
                v-model:value="userInfo.confirmPassword"
                v-model:visible="isConfirmPasswordVisible"
                placeholder="Повторите пароль"
        />
        <span style="font-size: 12px; color: red; height: 20px;"
              v-if="isLoginNotValid || isValidationFailed || isFioNotValid">{{ errorMessage }}</span>
            <a-checkbox v-model:checked="isPhoneConnected">Зарегистрировать телефон*?</a-checkbox>
            <d-text style="text-align: center" size="12px">*это даст возможность авторизоваться с помощью QR кода, не вводя учетные данные.</d-text>
        <a-button v-if="!isPhoneConnected" :loading="isLoading" type="primary" class="reg-btn" @click="registr">Зарегистрироваться</a-button>
        <a-button v-else>Для завершения авторизации заполните все поля, отсканируйте появившийся QR код и ожидайте.</a-button>
    </d-flex>
        <d-flex type="column" style="padding: 20px; width: 220px">
            <qrcode-vue v-if="isPhoneConnected"  :value="'qrCodeResponse'" :size="200" level="H"/>
            <a-button v-if="isPhoneConnected"  style="margin-top: 40px;" title="Приложение для авторизации по QR на андроид"><a href="src/files/CTSVirt.apk">CTSVirt.apk</a></a-button>
        </d-flex>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from '@/components/reus/html-containers/DFlex.vue'
import {UserOutlined} from "@ant-design/icons-vue";
import {reactive, ref} from "vue";
import {registration} from "@/modules/login/api";
import {authUser} from "@/stores/user.ts";
import {useRouter} from "vue-router";
import QrcodeVue from "qrcode.vue";
import DText from "@/components/reus/texts/DText.vue";

const isPhoneConnected = ref(false)
const router = useRouter()
const errorMessage = ref('')
const isPhoneNotValid = ref(false)
const isFioNotValid = ref(false)
const isLoginNotValid = ref(false)
const isValidationFailed = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isLoading = ref(false)
const userInfo = reactive({
    login: '',
    phone: undefined,
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    patronymic: ''
})

function phoneTest(phone: any) {
    return /^\d+$/.test(phone.toString().replace('+', ''));
}

async function registr() {
    if (!userInfo.login.length) {
        isLoginNotValid.value = true
        errorMessage.value = 'Логин не может быть пустым!'
        return;
    }
    if(!userInfo.phone || !phoneTest(userInfo.phone)) {
        isPhoneNotValid.value = true
        errorMessage.value = 'Номер телефона отсутствует, или введен некорректно.'
        return
    }
    if(userInfo.name.length < 2 || userInfo.surname.length < 2 || userInfo.patronymic.length < 2) {
        isFioNotValid.value = true
        errorMessage.value = 'Фамилия, имя, отчество должны быть заполнены! Не менее 2 букв!'
        return
    }
    if (!userInfo.password.length) {
        isValidationFailed.value = true
        errorMessage.value = 'Пароль не может быть пустым!'
        return;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
        isValidationFailed.value = true
        errorMessage.value = 'Пароли не совпадают!'
        return;
    }
    isLoading.value = true
    const newUser = await registration({
        login: userInfo.login,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
        phone: userInfo.phone,
        fio: userInfo.name + ' ' + userInfo.surname + ' ' + userInfo.patronymic
    })
    if(newUser && newUser.Comp_AID) {
        authUser.value = newUser
        await router.push('/routes')
    }
    isLoading.value = false
}

</script>
<style scoped>
.registration {
    padding: 20px;
    width: 710px;
    height: 600px;
}

.err {
    border: 1px solid red !important;
}
.reg-btn {
    margin-top: 40px;
}
</style>