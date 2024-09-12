<template>
    <div class="settings">
        <div class="lang">
            <span style="width: 200px;">{{t('settings.locale')}}:</span>
            <div class="lang-icons">
                <img :class="{active: CURRENT_LOCALE === Languages.en}"
                     @click="CURRENT_LOCALE = Languages.en"
                     src="@/assets/img/lang-en.png"
                     alt="English">
                <img :class="{active: CURRENT_LOCALE === Languages.ru}"
                     @click="CURRENT_LOCALE = Languages.ru"
                     src="@/assets/img/lang-ru.png"
                     alt="Русский">
                <img :class="{active: CURRENT_LOCALE === Languages.kz}"
                     @click="CURRENT_LOCALE = Languages.kz"
                     src="@/assets/img/lang-kz.png"
                     alt="Қазақ">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {CURRENT_LOCALE, Languages} from "@/locales";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
</script>

<style scoped>
.settings {
    background-color: white;
    max-width: 96%;
    height: 96%;
    margin: 1% auto 0;
    padding: 12px;
    border-radius: 6px;
}

.lang {
    display: flex;
    user-select: none;
    align-items: center;
    gap: 40px;
}

.lang-icons {
    display: flex;
    gap: 20px;

    & img {
        cursor: pointer;
        width: 40px;
        height: 100%;
        border-radius: 6px;
        border: 3px solid transparent;
    }
}

.active {
    border: 3px solid var(--primary-color) !important;
    box-shadow: 0 0 14px -2px var(--primary-color);
}
</style>