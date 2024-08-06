<template>
    <d-flex type="column" style="width: 100%;height: 100%;" justify="center">
        <d-text color="var(--primary-color)" size="30px">{{ getAuthMessage }}</d-text>
        <div style="height: 50px;">
            <a-spin size="large" v-if="isAuthInProgress"/>
        </div>
        <qrcode-vue v-if="isDataExist" :value="qrCodeResponse" :size="300" level="H"/>
    </d-flex>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import DText from "@/components/reus/texts/DText.vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {message} from "ant-design-vue";
import QrcodeVue from 'qrcode.vue'
import {authUser} from "@/stores/user.ts";
import router from "@/configs/router.ts";
import {APP_ID} from "@/constants.ts";

const interval = ref<any>()
const isAuthInProgress = ref(false)
const getAuthMessage = computed(() => isAuthInProgress.value ? 'Ждите...' : 'Отсканируйте QR-code в вашем телефоне')
const qrCodeResponse = ref<string>('')
const isDataExist = ref(false)
const sessId = ref('')
const sessIdSet = <string[]>([])

function generateRandom() {
    const A = generate(8)
    const B = generate(4)
    const C = generate(4)
    const D = generate(4)
    const E = generate(12)
    return `${A}-${B}-${C}-${D}-${E}`
}

function generate(p: number) {
    let result = ''
    const alphabet = ['a', 'b', 'c', 'd', 'f', 'e', 'g', 'k', 'l', 'm', 'a', 'b', 'c']
    for(let i = 0; i < p; i++) {
        const random = Math.floor(((Math.random() * 10)))
        if(random < Math.floor(p / 2)) {
            result += alphabet[i]
        } else result += random
    }
    return result
}


async function getDataForQRCode() {
    const resp = await fetch(`https://www.asts.kz:5554/api/AUTH/Get_QR?AppID=${APP_ID}&Sess_ID=${sessId.value}`)
    if (resp) {
        isDataExist.value = true
        qrCodeResponse.value = await resp.text()
    }
}

onMounted(async () => {
    sessId.value = generateRandom()
    sessIdSet.push(sessId.value)
    try {
        isAuthInProgress.value = true
        await getDataForQRCode()
        interval.value = setInterval(async () => {
            sessId.value = generateRandom()
            if(sessIdSet.length > 2) sessIdSet.shift()
            sessIdSet.push(sessId.value)
            await getDataForQRCode()
            for(let i = 0; i < sessIdSet.length; i++) {
                try {
                    const auth:any = await fetch(`https://www.asts.kz:5554/api/AUTH/Get_AUTH?SessID=${sessIdSet[i]}`)
                    const resp = await auth.json()
                    if(resp?.REG_ID) {
                        authUser.value = resp
                        clearInterval(interval.value)
                        await router.push('/routes')
                        message.success(`Авторизация прошла успешно! Добро пожаловать ${authUser!.value!.FIO}`, 8)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }, 5000)
        isAuthInProgress.value = false
    } catch (e) {
        isAuthInProgress.value = false
        message.error('Вы не имеете права доступа в приложение. Авторизуйтесь через QR-код!', 8)
        console.error(e)
    }
})
</script>


<style scoped>

</style>