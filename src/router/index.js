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
import NotVerified from '../views/NotVerified.vue'
import VendorPubblic from '../views/VendorPubblic.vue'
import Chat from '../views/Chat.vue'
import Signup from '../views/Signup.vue'
import Sell from '../views/Sell.vue'
import Verify from '../views/Verify.vue'
import Wishlist from '../views/Wishlist.vue'
import Product from '../views/Product.vue'

const checkAuthentication = (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.token) return next()

    next({ path: '/login', query: { redirect: to.fullPath } })
}

const checkVerification = (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.data.isVerified) return next()

    next({ path: '/notverified'})
}

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart, beforeEnter: [ checkAuthentication, checkVerification ] },
  { path: '/login', component: Login },
  { path: '/market', component: Market },
  { path: '/search', component: Search},
  { path: '/notverified', component: NotVerified},
  { path: '/profile', component: Profile, beforeEnter: [ checkAuthentication, checkVerification ] },
  { path: '/vendor', component: VendorPubblic },
  { path: '/chat', component: Chat, beforeEnter: [ checkAuthentication, checkVerification ] },
  { path: '/sell', component: Sell, beforeEnter: [ checkAuthentication, checkVerification ] },
  { path: '/signup', component: Signup },
  { path: '/verify', component: Verify, beforeEnter: checkAuthentication },
  { path: '/wishlist', component: Wishlist, beforeEnter: [ checkAuthentication, checkVerification ] },
  { path: '/item', component: Product},
  { path: '/item/id=:id', component: Product}, 
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({ history: createWebHistory(), routes })
