import { createI18n } from "vue-i18n";
import {CURRENT_LOCALE, getLocales} from "@/locales";
import { watch } from "vue";

const i18n = createI18n({
    locale: CURRENT_LOCALE.value,
    legacy: false,
    globalInjection: true,
    messages: await getLocales(),
});
export default i18n;

watch(CURRENT_LOCALE, () => {
    i18n.global.locale.value = CURRENT_LOCALE.value as any;
});
