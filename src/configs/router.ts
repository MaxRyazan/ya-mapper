import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        name: 'defaultLayout',
        component: () => import('@/components/layouts/DefaultLayout.vue'),
            children: [
                {
                    path: '/',
                    name: 'main',
                    component: () => import('@/modules/main/Index.vue'),
                },
                {
                    path: '/map',
                    name: 'map',
                    component: () => import('@/modules/map/Index.vue'),
                },
            ]
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router