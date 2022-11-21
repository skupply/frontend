<script>
  import { ref } from 'vue'
  import { useMessage } from 'naive-ui'
  import { useEndpointStore } from '../stores/endpoint'
  import { useUserStore } from '../stores/user'
  import router from '../router'

  let user;
  let endpoint;
  async function LoginUser(data) {
    let ok = false;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    };
    const result = await fetch(`${endpoint.endpoint}/login/`, requestOptions)
      .then(response => response.json())
      .then(data => { return {ok: data.ok, token: data.token} });

    return result;
  }

  export default {
    setup () {
      user = useUserStore()
      endpoint = useEndpointStore()
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
            message: 'Inserisca la sua email',
            trigger: ['input', 'blur'],
            type: 'email'
          },
          password: {
            required: true,
            message: 'Inserisca la sua password',
            trigger: ['input', 'blur']
          }
        },
        signupRedirect () {
          window.location.replace('/signup');
        },
        handleValidateClick (event) {
          event.preventDefault()
          formRef.value?.validate(async errors => {
            if (!errors) {
              let ok = true;
              const data = formRef.value.model;

              const result = await LoginUser(data);
              if (!result.ok) {
                message.error('Credenziali errate');
                ok = false;
              }

              if (ok) {
                user.setToken(result.token);
                message.success('Campi validi');
                router.push('/');
              }
            } else {
              message.error('Campi non validi')
            }
          })
        }
      }
    }
  }
</script>

<template>
  <n-space justify="center" align="center" style="min-height: calc(100vh - 64px); gap: 50px;">
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
                <router-link to="" class="t-small" style="text-decoration: none">Password dimenticata?</router-link>
                <n-button round size="large" type="primary" block @click="handleValidateClick">Accedi</n-button>
              </n-space>
              <n-space vertical align="stretch">
                <span class="t-small">Non hai ancora un account?</span>
                <n-button round size="large" type="info" block @click="signupRedirect">Registrati</n-button>
              </n-space>
            </n-space>
          </n-space>
        </n-card>
      </n-form>
  </n-space>
</template>

<style scoped>
</style>