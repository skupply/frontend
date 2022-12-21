<script>
// States imports
import { useUserStore } from '../stores/user'

// Components imports
import NavLink from './NavLink.vue'
import Skupply from './icons/Skupply.vue'
import { User } from '@vicons/carbon'
import { Box16Regular } from '@vicons/fluent'
import { BagHandleOutline, CartOutline, ChatbubblesOutline, HeartOutline } from '@vicons/ionicons5'

const theme = {
  Button: {
    fontWeight: '600',
    fontSizeLarge: '16px',
    paddingRoundLarge: '0 40px',
    borderPrimary: '2px solid #44355B'
  }
}

export default {
  data() {
    const user = useUserStore()

    return { user, theme }
  },
  components: {
    BagHandleOutline,
    Box16Regular,
    CartOutline,
    ChatbubblesOutline,
    HeartOutline,
    NavLink,
    Skupply,
    User
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-space justify="space-between" align="center" style="height: 64px; padding: 0 calc(20vw - 150px); flex-wrap: nowrap;">
      <router-link to="/" style="display: flex">
        <Skupply size="100" style="margin-top: 7.5px"/>
      </router-link>

      <n-space justify="center" size="large" style="flex-wrap: nowrap;">
        <NavLink link="/market" label="Negozio"><BagHandleOutline/></NavLink>
        <NavLink link="/sell" label="Vendi"><Box16Regular/></NavLink>
        <NavLink link="/chat" label="Messaggi"><ChatbubblesOutline/></NavLink>
        <NavLink link="/wishlist" label="Wishlist"><HeartOutline/></NavLink>
        <NavLink link="/cart" label="Carrello"><CartOutline/></NavLink>
      </n-space>

      <NavLink v-if="user.token" link="/profile" label="Profilo"><User/></NavLink>
      <n-button v-else ghost round type="primary" size="large" @click="this.$router.push('/login')">Accedi</n-button>
    </n-space>
  </n-config-provider>
</template>

<style scoped>
</style>
