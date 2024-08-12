<template>
    <d-flex type="column" class="page-wrapper">
        <d-flex style="width: 100%;" justify="end">
            <a-button :type="route.path === '/registration'?'primary':'default'" @click="router.push('/registration')">
                Регистрация
            </a-button>
            <a-button :type="route.path === '/login'?'primary':'default'" @click="router.push('/login')">
                Авторизация
            </a-button>
        </d-flex>
        <d-flex style="position: absolute; left: 50%;top: 50%; transform: translate(-50%, -50%);">
            <router-view v-slot="{ Component }">
                <transition
                        name="router"
                        mode="out-in">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </d-flex>
    </d-flex>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
const route = useRoute()
</script>
<style scoped>
.router-enter-from,
.router-leave-to {
    opacity: 0;
}
.router-enter-active,
.router-leave-active {
    transition: opacity 0.3s;
}
</style>