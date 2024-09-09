import { createApp } from 'vue'
import './assets/css/style.css'
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue'
import router from "./configs/router.ts";
//@ts-ignore
import QuickAuth from 'quick-registration'
//@ts-ignore
import QuickReg from 'quick-registration'

const app = createApp(App)
    app
        .use(router)
        .use(QuickAuth)
        .use(QuickReg)
        .use(createYmaps({
            apikey: '1414ea1f-cfdd-4471-9664-5ac276836b3a',
        }))
    .mount('#app')
