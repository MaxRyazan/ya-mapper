<template>
    <d-flex gap="15px" class="user-info">
        <d-flex gap="2px" type="column">
            <d-text weight="600" cursor="pointer" class="user-info__fio">{{userFIO}}</d-text>
            <d-text>{{userRole}}</d-text>
        </d-flex>
        <a-popconfirm
                placement="rightBottom"
                title="Выйти из аккаунта?"
                ok-text="Да"
                cancel-text="Отмена"
                @confirm="logout"
        >
        <logout-outlined class="logout-icon" title="Выйти"/>
        </a-popconfirm>
    </d-flex>
</template>
<script setup lang="ts">
import {LogoutOutlined} from "@ant-design/icons-vue";
import {authUser} from "@/stores/user.ts";
import DText from "@/components/reus/texts/DText.vue";
import {computed} from "vue";
import router from "@/configs/router.ts";
import {USER_ROLES_MAP} from "@/constants.ts";

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

const userRole = computed(() => USER_ROLES_MAP.get(authUser.value?.Role as any))

function logout() {
    authUser.value = null
    router.push('/')
}
</script>


<style scoped>
.user-info {
    max-width: 200px;
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    z-index: 5;
}
.logout-icon {
    font-size: 30px;
    transition: .3s;
    cursor: pointer;
    color: var(--main-nav-bg);
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