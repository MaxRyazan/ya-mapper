import { RUS } from "@/locales/ru";
import { ENG } from "@/locales/en";
import { KAZ } from "@/locales/kz";
import { ref, Ref } from "vue";
import { Locale } from "vue-i18n";

export async function getLocales() {
    let en = {};
    let ru = {};
    let kz = {};

    for (let file in RUS) {
        const fileName = file.replace("./", "").replace(".json", "");
        let obj = await import(`@/locales/ru/${fileName}.json`);

        ru = { ...ru, ...obj.default };
    }
    for (let file in ENG) {
        const fileName = file.replace("./", "").replace(".json", "");
        let obj = await import(`@/locales/en/${fileName}.json`);

        en = { ...en, ...obj.default };
    }
    for (let file in KAZ) {
        const fileName = file.replace("./", "").replace(".json", "");
        let obj = await import(`@/locales/en/${fileName}.json`);

        kz = { ...kz, ...obj.default };
    }
    return { 'Русский':ru, 'English': en, 'Қазақ': kz };
}

export enum Languages {
    en = 'English',
    ru = 'Русский',
    kz = 'Қазақ'
}

export const CURRENT_LOCALE: Ref<Locale> = ref(Languages.ru);
