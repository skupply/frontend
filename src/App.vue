<script>
// Files imports 
import theme from './assets/theme'

// States imports
import { useUserStore } from './stores/user'

// Components imports
import Footer from './components/Footer.vue'
import Navbar from './components/NavBar.vue'

export default {
  data() {
    const user = useUserStore()
    if (!user.logged) { user.data = {}; user.token = null }

    return { theme }
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
