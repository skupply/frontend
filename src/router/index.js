import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import ServerError from '../views/500.vue'
import Login from '../views/Login.vue'
import Market from '../views/Market.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/500',
            name: '500',
            component: ServerError
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/market',
            name: 'market',
            component: Market
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound
        }
    ]
})

export default router