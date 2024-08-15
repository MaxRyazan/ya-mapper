import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {authUser} from "@/stores/user.ts";




const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/modules/login/Index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/login',
                alias: ['/login'],
                name: 'login',
                component: () => import('@/modules/login/views/cards/NewLogin.vue'),
            },
            {
                path: '/registration',
                name: 'registration',
                component: () => import('@/modules/login/views/cards/TheRegistration.vue'),
            },
        ]
    },
    {
        path: '/map',
        name: 'defaultLayout',
        component: () => import('@/components/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '/map',
                name: 'map',
                component: () => import('@/modules/map/Index.vue'),
                meta: {
                    public: true
                }
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
                name: 'routeIdPath',
                component: () => import('@/modules/routes/Index.vue'),
            },
            {
                path: '/routes/stations/:id',
                name: 'stations',
                component: () => import('@/modules/routes/views/RouteIdStations.vue'),
            },
            {
                path: '/routes/:id',
                name: 'routes',
                component: () => import('@/modules/routes/views/RouteIdPath.vue'),
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
                path: '/auto-work',
                name: 'auto-work',
                component: () => import('@/modules/transport-work/Index.vue'),
            },
            {
                path: '/admin',
                name: 'AdminPage',
                component: () => import('@/modules/admin/Index.vue'),
                meta: {
                    rolesRequired: [7]
                }
            },
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router

const publicPaths = ['/login', '/registration']

router.beforeEach(async (to: RouteLocationNormalized, _, next:NavigationGuardNext) => {
    if(!publicPaths.includes(to.path)) {
        if(authUser.value) {
            next()
        } else {
            if(to.meta.public) next()
            else next('/login')
        }
    } else next()
})