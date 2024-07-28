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
import {authUser} from "@/stores/user.ts";
import DText from "@/components/reus/texts/DText.vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import router from "@/configs/router.ts";

const isAuthInProgress = ref(false)
const getAuthMessage = computed(() => isAuthInProgress.value ? 'Ждите... идёт авторизация' : 'Страница Авторизации')
onMounted(async () => {
    isAuthInProgress.value = true
    const response = await fetch('https://www.asts.kz:5554/api/AUTH/Get_AUTH_PAR?AID=F4870000050001')
    if(response) {
        const stringData = await response.json()
        authUser.value = JSON.parse(stringData)
        setTimeout(async () => {
            await router.push('/routes')
            isAuthInProgress.value = false
            console.log(authUser.value)
        }, 1000)
    }
})
</script>


<style scoped>

</style>