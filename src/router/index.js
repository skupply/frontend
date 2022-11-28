// Packages imports
import { createRouter, createWebHistory } from 'vue-router'

// Files imports
import { useUserStore } from '../stores/user'

// Components imports
import Cart from '../views/Cart.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import Market from '../views/Market.vue'
import Profile from '../views/Profile.vue'
import Signup from '../views/Signup.vue'
import Verify from '../views/Verify.vue'
import Wishlist from '../views/Wishlist.vue'

const checkAuthentication = (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.token) return next()

    next({ path: '/login', query: { redirect: to.path } })
}

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart, beforeEnter: checkAuthentication },
  { path: '/login', component: Login },
  { path: '/market', component: Market },
  { path: '/profile', component: Profile, beforeEnter: checkAuthentication },
  { path: '/signup', component: Signup },
  { path: '/verify', component: Verify, beforeEnter: checkAuthentication },
  { path: '/wishlist', component: Wishlist, beforeEnter: checkAuthentication },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({ history: createWebHistory(), routes })
