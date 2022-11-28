<script>
// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

let message = null
const signupForm = ref(null)
const signupModel = ref({ password: '', confirmPassword: '' })

// Form attributes rules
const signupRules = {
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
  },
  confirmPassword: {
    required: true,
    validator(rule, value) {
      const password = signupForm.value.model.password

      if (!value)
        return new Error('Inserisca la password di conferma')
      else if (value != password)
        return new Error('Le due password non coincidono')

      return true
    },
    trigger: ['input', 'blur']
  }
}

export default {
  data() {
    const color = '#000000A0'
    return {
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
        const password = this.signupModel.password

        this.$emit('submit', { password })
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
        <n-form-item path="password" label="Password">
          <n-input type="password" v-model:value="signupModel.password" show-password-on="mousedown" round :allow-input="noSideSpace"/>
        </n-form-item>
        <n-form-item path="confirmPassword" label="Conferma password">
          <n-input type="password" v-model:value="signupModel.confirmPassword" show-password-on="mousedown" round :allow-input="noSideSpace"/>
        </n-form-item>
      </n-space>
    </n-form>

    <n-space vertical>
      <n-button round block type="primary" size="large" @click="continueSignup">Continua</n-button>
      <n-p :style="textStyle">La password deve contenere almeno 8 caratteri, una lettera maiuscola, una lettera minuscola, un numero ed un carattere speciale (!@#$%^&*)</n-p>
    </n-space>
  </n-space>
</template>

<style scoped>
</style>
