import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized,} from "vue-router";
import {authUser} from "@/stores/user.ts";


const routesRouter = [
    {
        path: '/routes/common',
        name: 'routesAll',
        component: () => import('@/modules/routes/views/tabs/RoutesList.vue'),
    },
]
const adminRouter = [
    {
        path: '/admin/common',
        name: 'adminCommon',
        component: () => import('@/modules/admin/views/tabs/AdminCommon.vue'),
        meta: {
            rolesRequired: [7]
        }
    },
]

const transportRouter = [
    {
        path: '/transport/common',
        name: 'transportCommon',
        component: () => import('@/modules/transport/views/tabs/TransportCommon.vue'),
    },
]

const dispatchRouter = [
    {
        path: '/dispatch/common',
        name: 'DispatchCommon',
        component: () => import('@/modules/dispatch/views/tab/TabCommon.vue'),
    },
    {
        path: '/dispatch/monitor',
        name: 'DispatchMonitor',
        component: () => import('@/modules/dispatch/views/tab/TabMonitor.vue'),
    },
    {
        path: '/dispatch/path',
        name: 'DispatchPath',
        component: () => import('@/modules/dispatch/views/tab/TabPath.vue'),
    },
    {
        path: '/dispatch/vectors',
        name: 'DispatchVectors',
        component: () => import('@/modules/dispatch/views/tab/TabVectors.vue'),
    },
    {
        path: '/dispatch/screw',
        name: 'DispatchScrew',
        component: () => import('@/modules/dispatch/views/tab/TabScrew.vue'),
    },
    {
        path: '/dispatch/list',
        name: 'DispatchList',
        component: () => import('@/modules/dispatch/views/tab/TabList.vue'),
    },
    {
        path: '/dispatch/weekend',
        name: 'DispatchWeekend',
        component: () => import('@/modules/dispatch/views/tab/TabWeekend.vue'),
    },
    {
        path: '/dispatch/nodes',
        name: 'DispatchNodes',
        component: () => import('@/modules/dispatch/views/tab/TabNodes.vue'),
    },
    {
        path: '/dispatch/graph-map',
        name: 'DispatchGraphMap',
        component: () => import('@/modules/dispatch/views/tab/TabGraphMap.vue'),
    },
    {
        path: '/dispatch/graph-stations',
        name: 'DispatchGraphStations',
        component: () => import('@/modules/dispatch/views/tab/TabGraphStations.vue'),
    },
    {
        path: '/dispatch/graph-reis',
        name: 'DispatchGraphReis',
        component: () => import('@/modules/dispatch/views/tab/TabGraphReis.vue'),
    },
    {
        path: '/dispatch/future',
        name: 'DispatchFuture',
        component: () => import('@/modules/dispatch/views/tab/TabFuture.vue'),
    },
    {
        path: '/dispatch/message',
        name: 'DispatchMessage',
        component: () => import('@/modules/dispatch/views/tab/TabMessage.vue'),
    },
]


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
                redirect: '/dispatch/common',
                children: dispatchRouter,
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
                redirect: '/routes/common',
                children: routesRouter
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
                redirect: '/transport/common',
                children: transportRouter
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
                redirect: '/admin/common',
                children: adminRouter
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