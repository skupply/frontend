import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import ServerError from '../views/500.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import Cart from '../views/Cart.vue'
import Market from '../views/Market.vue'


// no authentication required
const noAuthenticationRequired = (to, from, next) => {
    next()
  }
  
// make sure user is authenticated
const requiresAuthentication = (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.token != null) {
        return next()   
    }

    // not successful
    next('/login')
}

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            beforeEnter: noAuthenticationRequired,
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            beforeEnter: noAuthenticationRequired,
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            beforeEnter: noAuthenticationRequired,
            component: Signup
        },
        {
            path: '/profile',
            name: 'profile',
            beforeEnter: requiresAuthentication,
            component: Profile
        },
        {
            path: '/cart',
            name: 'cart',
            beforeEnter: requiresAuthentication,
            component: Cart
        },
        {
            path: '/market',
            name: 'market',
            beforeEnter: noAuthenticationRequired,
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