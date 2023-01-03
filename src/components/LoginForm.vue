<script>
// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

// States imports
import { useServerStore } from '../stores/server'
import { useUserStore } from '../stores/user'

let message = null
const loginForm = ref(null)
const loginModel = ref({ email: '', password: '', logged: true })

async function requestLogin({ email, password }) {
  const server = useServerStore()
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password})
  }

  const result = await fetch(server.loginEndpoint, options)
    .then(response => {
      return response.json()
    })

  return result
}

// Form attributes rules
const loginRules = {
  email: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca l\'email')
      else if (value.match(/.*\s.*/))
        return new Error('L\'email non deve contenere spazi')
      else if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
        return new Error('L\'email non è valida')

      return true
    },
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca la password')
      else if (value.match(/.*\s.*/))
        return new Error('La password non deve contenere spazi')
      else if (value.length < 8)
        return new Error('La password deve contenere almeno 8 caratteri')
      else if (!value.match(/.*[a-z].*/))
        return new Error('La password deve contenere almeno una lettera minuscola')
      else if (!value.match(/.*[A-Z].*/))
        return new Error('La password deve contenere almeno una lettera maiuscola')
      else if (!value.match(/.*[0-9].*/))
        return new Error('La password deve contenere almeno un numero')
      else if (!value.match(/.*[!@#$%^&*].*/))
        return new Error('La password deve contenere almeno un carattere speciale (!@#$%^&*)')
      else if (!value.match(/^[a-zA-Z0-9!@#$%^&*]{8,}$/))
        return new Error('La password non è valida')

      return true
    },
    trigger: ['input', 'blur']
  }
}

export default {
  data() {
    const color = '#000000A0'

    return {
      color,
      disabled: false,
      textStyle: { color: color, fontSize: '0.85rem' }
    }
  },
  setup() {
    message = useMessage()

    return {
      loginForm,
      loginModel,
      loginRules,
    }
  },
  methods: {
    noSideSpace(value) { return value == value.trim() },
    validateLogin() {
      loginForm.value?.validate(async error => {
        if (error) { message.error('Campi non validi'); return true }
        
        this.disabled = true
        let verifing = message.create('Verifica in corso', { type: 'loading', duration: 0 })

        const response = await requestLogin({ email: this.loginModel.email, password: this.loginModel.password })

        if (response.ok == true) {
          const keys = ['id', 'firstname', 'lastname', 'username', 'email', 'addresses', 'phone', 'cart', 'wishlist', 'proposals', 'isVerified', 'isSeller', 'sellerId', 'token']
    
          if (keys.every(key => response.user[key] !== undefined)) {
            const user = useUserStore()

            user.data = response.user
            user.logged = this.loginModel.logged
            user.token = response.user.token

            this.loginModel.email = ''
            this.loginModel.password = ''

            verifing.type = 'success'
            verifing.content = 'Autenticato con successo'

            const previous = this.$route.query.redirect || this.$router.options.history.state.back || '/'
            this.$router.push(previous) // Return back in web history
          } else console.log('Error: Incomplete response data')
        } else {
          verifing.type = 'error'
          verifing.content = 'Credenziali errate'
        }

        setTimeout(verifing.destroy, 3000)
        this.disabled = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <n-space vertical size="large">
    <n-h1>Login</n-h1>

    <n-form ref="loginForm" :model="loginModel" :rules="loginRules">
      <n-space vertical size="large">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="loginModel.email" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input type="password" v-model:value="loginModel.password" show-password-on="mousedown" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="logged" :show-label="false">
          <n-checkbox v-model:checked="loginModel.logged">Resta connesso</n-checkbox>
        </n-form-item>
      </n-space>
    </n-form>

    <n-space vertical>
      <router-link to="/login" :style="{ color: color }"><n-p class="text" :style="textStyle">Password dimenticata?</n-p></router-link>
      <n-button :disabled="disabled" round block type="primary" size="large" @click="validateLogin">Accedi</n-button>
    </n-space>
    <n-space vertical>
      <n-p :style="textStyle">Non hai ancora un account?</n-p>
      <n-button round block type="info" size="large" @click="this.$router.push('/signup')">Registrati</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
</style>
