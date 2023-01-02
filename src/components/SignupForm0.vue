<script>
// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

// States imports
import { useServerStore } from '../stores/server'

let message = null
const signupForm = ref(null)
const signupModel = ref({ firstname: '', lastname: '', username: '', email: '' })

async function checkEmail(email) {
  const server = useServerStore()
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  const result = await fetch(`${server.emailEndpoint}/?email=${email}`, options)
    .then(response => response.json())
  
  return result;
}

async function checkUsername(username) {
  const server = useServerStore();
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  const result = await fetch(`${server.buyerEndpoint}/find/?username=${username}`, options)
    .then(response => response.json())

  return result
}

// Form attributes rules
const signupRules = {
  firstname: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca il nome')
      return true
    },
    trigger: ['input', 'blur']
  },
  lastname: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca il cognome')
      return true
    },
    trigger: ['input', 'blur']
  },
  username: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca l\'username')
      else if (value.match(/.*\s.*/))
        return new Error('L\'username non deve contenere spazi')

      return true
    },
    trigger: ['input', 'blur']
  },
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
  }
}

export default {
  data() {
    const color = '#000000A0'
    return {
      disabled: false,
      textStyle: { color: color, fontSize: '0.85rem' }
    }
  },
  setup() {
    message = useMessage()

    return {
      signupForm,
      signupModel,
      signupRules,
    }
  },
  methods: {
    noSideSpace(value) { return value == value.trim() },
    continueSignup() {
      signupForm.value?.validate(async error => {
        if (error) { message.error('Campi non validi'); return true }
        const firstname = this.signupModel.firstname
        const lastname = this.signupModel.lastname
        const username = this.signupModel.username
        const email = this.signupModel.email

        this.disabled = true
        let verifing = message.create('Verifica in corso', { type: 'loading', duration: 0 })

        const emailResponse = await checkEmail(email)
        const usernameResponse = await checkUsername(username)

        console.log(emailResponse, usernameResponse)
        let emailResult = false
        let usernameResult = false
        switch (emailResponse.code) {
          case 202:
            verifing.content = 'Richiesta formattata non correttamente'
            break
          case 203:
            emailResult = true
            break
          case 204:
            verifing.content = 'Questa email non è raggiungibile'
            break
          case 205:
            verifing.content = 'Questa email è già utilizzata'
            break
        }

        switch (usernameResponse.code) {
          case 102:
            verifing.content = 'Richiesta formattata non correttamente'
            break
          case 104:
            usernameResult = true
            break
          case 107:
            verifing.content = 'Questo username è già in utilizzo'
            break
        }

        if (!emailResult || !usernameResult) {
          setTimeout(verifing.destroy, 3000)
          verifing.type = 'error'
        } else {
          verifing.destroy()
          this.$emit('submit', { firstname, lastname, username, email })
        }

        this.disabled = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <n-space vertical size="large">
    <n-h1>Signup</n-h1>

    <n-form ref="signupForm" :model="signupModel" :rules="signupRules">
      <n-space vertical size="large">
        <n-form-item path="firstname" label="Nome">
          <n-input v-model:value="signupModel.firstname" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="lastname" label="Cognome">
          <n-input v-model:value="signupModel.lastname" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="username" label="Username">
          <n-input v-model:value="signupModel.username" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="signupModel.email" round :allow-input="noSideSpace"/>
        </n-form-item>
      </n-space>
    </n-form>

    <n-button :disabled="disabled" round block type="primary" size="large" @click="continueSignup">Continua</n-button>
    <n-space vertical>
      <n-p :style="textStyle">Possiedi già un account?</n-p>
      <n-button round block type="info" size="large" @click="this.$router.push('/login')">Accedi</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
</style>
