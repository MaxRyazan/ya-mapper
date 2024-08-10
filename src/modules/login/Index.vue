<template>
    <d-flex type="column" class="login__wrapper">
        <d-flex justify="end" style="width: 100%;">
            <a-button @click="changeComponent(TheRegistration)" :type="currentComponent === TheRegistration ? 'primary' : 'default'">Регистрация</a-button>
            <a-button @click="changeComponent(NewLogin)" :type="currentComponent === NewLogin ? 'primary' : 'default'">Авторизация по логину/паролю</a-button>
            <a-button @click="changeComponent(TheQr)" :type="currentComponent === TheQr ? 'primary' : 'default'">Авторизация по QR</a-button>
        </d-flex>
        <d-flex style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
            <transition name="login" mode="out-in">
                <component :is="currentComponent"></component>
            </transition>
        </d-flex>
    </d-flex>
</template>

<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import type {Component} from "vue";
import {shallowRef} from "vue";
import TheRegistration from "@/modules/login/views/cards/TheRegistration.vue";
import NewLogin from "@/modules/login/views/cards/NewLogin.vue";
import TheQr from "@/modules/login/views/cards/TheQr.vue";

const currentComponent = shallowRef<Component>(TheRegistration)

function changeComponent(component: Component) {
    currentComponent.value = component
}
</script>


<style scoped>
.login__wrapper {
    padding: 10px;

}
.login-enter-from,
.login-leave-to {
    opacity: 0;
}
.login-enter-active,
.login-leave-active {
    transition: .3s;
}
</style>