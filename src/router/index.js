import Vue from 'vue'
import VueRouter from 'vue-router'
import { ifAuthDeny, ifNotAuthDeny } from './auth_guard'

Vue.use(VueRouter)

let routes = [{
        // will match everything
        path: '*',
        component: () =>
            import ('../views/404.vue'),
    },
    {
        path: '/',
        name: 'Dashboard',
        layout: "dashboard",
        // beforeEnter: ifNotAuthDeny,
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    },
    {
        path: '/docs',
        name: 'Docs',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../views/Docs.vue'),
    },
    {
        path: '/api',
        name: 'API',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../views/API.vue'),
    },
    {
        path: '/contents',
        name: 'Contents',
        component: () =>
            import ('../views/Contents.vue'),
    },
    {
        path: '/layout',
        name: 'Layout',
        layout: "dashboard",
        component: () =>
            import ('../views/Layout.vue'),
    },
    {
        path: '/tables',
        name: 'Tables',
        layout: "dashboard",
        component: () =>
            import ('../views/Tables.vue'),
    },
    {
        path: '/billing',
        name: 'Billing',
        layout: "dashboard",
        component: () =>
            import ('../views/Billing.vue'),
    },
    {
        path: '/rtl',
        name: 'RTL',
        layout: "dashboard-rtl",
        meta: {
            layoutClass: 'dashboard-rtl',
        },
        component: () =>
            import ('../views/RTL.vue'),
    },
    {
        path: '/Profile',
        name: 'Profile',
        layout: "dashboard",
        meta: {
            layoutClass: 'layout-profile',
        },
        component: () =>
            import ('../views/Profile.vue'),
    },
    {
        path: '/sign-in',
        name: 'Sign-In',
        beforeEnter: ifAuthDeny,
        component: () =>
            import ('../views/Sign-In.vue'),
    },
    {
        path: '/sign-up',
        name: 'Sign-Up',
        beforeEnter: ifAuthDeny,
        component: () =>
            import ('../views/Sign-Up.vue'),
    },
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "default") {
    route.meta = route.meta || {};
    route.meta.layout = route.layout || parentLayout;

    if (route.children) {
        route.children = route.children.map((childRoute) => addLayoutToRoute(childRoute, route.meta.layout));
    }
    return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
        return {
            x: 0,
            y: 0,
            behavior: 'smooth',
        }
    }
})

export default router