import { createApp } from 'vue'
import './assets/css/style.css'
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue'
import router from "./configs/router.ts";

const app = createApp(App)
    app
        .use(router)
        .use(createYmaps({
            apikey: 'b707dc52-a4d4-4a12-a716-c7c608e89bbe',
        }))
    .mount('#app')
