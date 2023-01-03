<script>
// Files imports 
import theme from './assets/theme'

// States imports
import { useUserStore } from './stores/user'
import { useServerStore } from './stores/server'

// Components imports
import Footer from './components/Footer.vue'
import Navbar from './components/NavBar.vue'

export default {
  data() {
    const user = useUserStore()
    if (!user.logged) { user.data = {}; user.token = null }

    return { theme }
  },
  async beforeMount() {
    const user = useUserStore()
    const server = useServerStore()
    if (!user.token) return

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

    const result = await fetch(`${server.buyerEndpoint}`, options).then(response => response.json())
    user.data = {...(user.data), ...(result.buyer)}
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-message-provider>
      <Navbar/>
      <RouterView/>
      <Footer/>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
