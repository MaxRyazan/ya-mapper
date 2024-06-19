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
                {
                    path: '/change-password',
                    name: 'change-password',
                    component: () => import('@/modules/change-password/Index.vue'),
                },
                {
                    path: '/conductors',
                    name: 'conductors',
                    component: () => import('@/modules/conductors/Index.vue'),
                },
                {
                    path: '/dispatch',
                    name: 'dispatch',
                    component: () => import('@/modules/dispatch/Index.vue'),
                },
                {
                    path: '/drivers',
                    name: 'drivers',
                    component: () => import('@/modules/drivers/Index.vue'),
                },
                {
                    path: '/exit',
                    name: 'exit',
                    component: () => import('@/modules/exit/Index.vue'),
                },
                {
                    path: '/journal',
                    name: 'journal',
                    component: () => import('@/modules/journal/Index.vue'),
                },
                {
                    path: '/rating',
                    name: 'rating',
                    component: () => import('@/modules/ratings/Index.vue'),
                },
                {
                    path: '/routes',
                    name: 'routes',
                    component: () => import('@/modules/routes/Index.vue'),
                },
                {
                    path: '/statistics',
                    name: 'statistics',
                    component: () => import('@/modules/statistics/Index.vue'),
                },
                {
                    path: '/transport',
                    name: 'transport',
                    component: () => import('@/modules/transport/Index.vue'),
                },
                {
                    path: '/transport-work',
                    name: 'transport-work',
                    component: () => import('@/modules/transport-work/Index.vue'),
                },
            ]
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router