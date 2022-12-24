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
import Search from '../views/Search.vue'
import Profile from '../views/Profile.vue'
import VendorPubblic from '../views/VendorPubblic.vue'
import Signup from '../views/Signup.vue'
import Verify from '../views/Verify.vue'
import Wishlist from '../views/Wishlist.vue'
import Product from '../views/Product.vue'

const checkAuthentication = (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.token) return next()

    next({ path: '/login', query: { redirect: to.fullPath } })
}

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart, beforeEnter: checkAuthentication },
  { path: '/login', component: Login },
  { path: '/market', component: Market },
  { path: '/search', component: Search},
  { path: '/profile', component: Profile, beforeEnter: checkAuthentication },
  { path: '/vendor', component: VendorPubblic },
  { path: '/signup', component: Signup },
  { path: '/verify', component: Verify, beforeEnter: checkAuthentication },
  { path: '/wishlist', component: Wishlist, beforeEnter: checkAuthentication },
  { path: '/item', component: Product},
  { path: '/item/id=:id', component: Product}, 
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({ history: createWebHistory(), routes })
