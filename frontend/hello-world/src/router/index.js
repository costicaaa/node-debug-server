import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: 'debug'
        }
    },
    {
        path: '/debug/:columns',
        name: 'debug',
        component: HelloWorld,
        props: route => {
            console.log(route);
            let columnNumber = parseInt(route.params.columns);
            if ([1, 2, 3, 4, 6].indexOf(columnNumber) !== -1) {
              return {columns : columnNumber}
            } else {
              return {columns : 3}
            }
        }
    },

    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
