<script>
  import { ref } from 'vue'
  import { useMessage } from 'naive-ui'

  export default {
    setup () {
      const formRef = ref(null)
      const message = useMessage()
      return {
        formRef,
        size: 'large',
        model: ref({
          email: '',
          password: ''
        }),
        rules: {
          email: {
            required: true,
            message: 'Please input your email',
            trigger: ['input', 'blur']
          },
          password: {
            required: true,
            message: 'Please input your password',
            trigger: ['input', 'blur']
          }
        },
        handleValidateClick (event) {
          event.preventDefault()
          formRef.value?.validate((errors) => {
            if (!errors) {
              message.success('Campi Validi')
            } else {
              message.error('Campi Invalidi')
            }
          })
        }
      }
    }
  }
</script>

<template>
  <n-space justify="center" align="center" style="gap: 50px; padding-top: 12vh;">
      <img src="../images/Login.png"/>

      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        :size="size"
      >
        <n-card bordered style="width: 25vw;">
          <n-space vertical>
            <span class="t-h1">Login</span>
            <n-space vertical>
              <n-form-item path="email" label="Email">
                <n-input
                  round
                  type="email"
                  v-model:value="model.email"
                />
              </n-form-item>
              <n-form-item path="password" label="Password">
                <n-input
                  round
                  type="password"
                  v-model:value="model.password"
                  show-password-on="mousedown"
                />
              </n-form-item>
            </n-space>
            <n-space vertical style="gap: 20px;">
              <n-space vertical align="stretch">
                <a href="" class="t-small" style="text-decoration: none">Password dimenticata?</a>
                <n-button round size="large" type="primary" block @click="handleValidateClick">Accedi</n-button>
                <span id="errorMsg" class="c-error">Fatal login error</span><!--span per l'inserimento di messaggi di errori dovuti al login-->
              </n-space>
              <n-space vertical align="stretch">
                <span class="t-small">Non hai ancora un account?</span>
                <n-button round size="large" type="info" block @click="">Registrati</n-button>
              </n-space>
            </n-space>
          </n-space>
        </n-card>
      </n-form>
  </n-space>
</template>

<style scoped>
</style>