<script>
// Components Imports
import VerifyFail from '../components/images/VerifyFail.vue'
import VerifySuccess from '../components/images/VerifySuccess.vue'

// States imports
import { useServerStore } from '../stores/server'
import { useUserStore } from '../stores/user'

async function verifyUser() {
  const user = useUserStore()
  const server = useServerStore()
  const urlParams = new URLSearchParams(window.location.search)
  if (!urlParams.has(user.codeparam)) return null

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
  }

  /* Backend refactoring required
  const result = await fetch(`${server.loginEndpoint}/verify', options)
    .then(response => {
      if (response.status != 200) return null
      return response.json()
    })
  */
  const result = { code: 0x0300, message: 'User verified successfully' }

  return result
}

export default {
  data() {
    return { status }
  },
  async mounted() {
    const result = await verifyUser()
    this.status = result ? 'success' : 'fail'
  },
  components: {
    VerifyFail,
    VerifySuccess
  }
}
</script>

<template>
  <n-space v-if="status == 'success'" class="container" justify="space-evenly" align="center">
    <VerifySuccess size="250"/>
    <n-space class="text" vertical>
      <n-h1>Verifica completata con successo</n-h1>
      <n-p>La verifica del suo account é stata verificata con successo. Ora ha accesso a tutte le funzionalitá di Skupply.</n-p>
    </n-space>
  </n-space>
  <n-space v-else-if="status == 'fail'" class="container" justify="space-evenly" align="center">
    <VerifyFail size="250"/>
    <n-space class="text" vertical>
      <n-h1>Errore durante la verifica dell'account</n-h1>
      <n-p>La verifica del suo account ha riscontrato un problema. Controlla che il link utilizzato sia corretto e che la registrazione dell'account sia avvenuta negli ultimi 14 giorni.</n-p>
    </n-space>
  </n-space>
  <n-h1 v-else class="container" style="display: grid; place-items: center;">Loading...</n-h1>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  padding: 0px 10vw;
}

.text {
  width: 50vw;
  line-height: 60px;
}
</style>
