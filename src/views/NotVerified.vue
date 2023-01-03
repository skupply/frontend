<script>
// Packages imports
import { useRouter } from 'vue-router'

// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

export default {
  setup() {
    const router = useRouter()
    const user = useUserStore();
    if (user.data.isVerified) router.push('/')
  },
}
</script>

<template>
  <n-space class="container" size="large" align="center">
    <n-space vertical size="large" align="center" style="margin: 25px 0;">
      <n-h3 style="line-height: 2rem;">Account non verificato!</n-h3>
      <n-p>Verifica la tua identità aprendo il link che ti abbiamo inviato in fase di registrazione al tuo indirizzo di posta elettronica</n-p>
      <n-button round size="large" type="primary" @click="this.$router.go()">Ricarica la pagina</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  padding: 50px calc(35vw - 100px);
  box-sizing: border-box;
}
</style>
