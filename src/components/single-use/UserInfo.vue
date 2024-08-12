<template>
    <d-flex class="user-info">
        <d-text cursor="pointer" class="user-info__fio">{{userFIO}}</d-text>
        <logout-outlined @click="logout" class="logout-icon" title="Выйти"/>
    </d-flex>
</template>
<script setup lang="ts">
import {LogoutOutlined} from "@ant-design/icons-vue";
import {authUser} from "@/stores/user.ts";
import DText from "@/components/reus/texts/DText.vue";
import {computed} from "vue";
import router from "@/configs/router.ts";

const userFIO = computed(() => {
    if(authUser?.value?.FIO) {
        const temp = authUser.value.FIO.split(' ')
        const F = temp[0]
        const I = temp[1].slice(0, 1)
        const O = temp[2].slice(0, 1)
        return `${F} ${I}.${O}.`
    }
    else return ''
})

function logout() {
    authUser.value = null
    router.push('/')
}
</script>


<style scoped>
.user-info {
    max-width: 200px;
    position: absolute;
    right: 50px;
}
.logout-icon {
    font-size: 30px;
    transition: .3s;
    cursor: pointer;
    color: var(--primary-color);
    &:hover{
        transform: scale(1.1);
        transition: .3s;
    }
}
.user-info__fio {
    &:hover {
        color: var(--primary-color) !important;
    }
}
</style>