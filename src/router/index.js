import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import ServerError from '../views/500.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import Cart from '../views/Cart.vue'
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
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/market',
            name: 'market',
            component: Market
        },
        {
            path: '/:pathMatch([5].*)*',
            name: '500',
            component: ServerError
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound
        }
    ]
})

export default router