<template>
<d-flex type="column" style="width: 100%;height: 100%;" justify="center">
    <d-text color="var(--primary-color)" size="30px">{{ getAuthMessage }}</d-text>
    <div style="height: 50px;">
        <a-spin size="large" v-if="isAuthInProgress"/>
    </div>
</d-flex>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import DText from "@/components/reus/texts/DText.vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {authUser} from "@/stores/user.ts";
import {message} from "ant-design-vue";

const isAuthInProgress = ref(false)
const getAuthMessage = computed(() => isAuthInProgress.value ? 'Ждите... идёт авторизация' : 'Страница Авторизации')

interface LoginResponse {
    AID: string
    LOGIN: string
    Sess_ID: string
}

onMounted(async () => {
    try {
        isAuthInProgress.value = true
        const firstRequest = await fetch('https://www.asts.kz:5554/api/AUTH/Get_AUTH_PAR?AID=F4870000050001')
        const data = await firstRequest.json()
        const res:LoginResponse[] = data.map((d: string) => JSON.parse(d))

        const pathString = res[0].LOGIN+'!'+res[0].Sess_ID

        const secondRequest = await fetch(`https://www.asts.kz:5554/api/AUTH/Get_USER_AUTH?Quest=${pathString}`)
        authUser.value = await secondRequest.json()
        console.log(authUser.value)
        isAuthInProgress.value = false
    } catch (e) {
        isAuthInProgress.value = false
        message.error('Вы не имеете права доступа в приложение. Авторизуйтесь через QR-код!', 8000)
        console.error(e)
    }
})
</script>


<style scoped>

</style>