<script>
  import { ref } from 'vue'
  import { useMessage } from 'naive-ui'

  const endpoint = 'http://localhost:3000';

  async function CreateUser(data) {
    let ok = false;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone,
        isSeller: data.seller
      })
    };
    const result = await fetch(`${endpoint}/user/`, requestOptions)
      .then(response => response.json())
      .then(data => data.ok);

    return result;
  }

  async function UsernameAvailable(username) {
    let available = false;

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //body: JSON.stringify({ username: username })
    };
    await fetch(`${endpoint}/user/?username=${username}`, requestOptions)
      .then(response => response.json())
      .then(data => (available = data.available));
    
    return available;
  }

  async function EmailAvailable(email) {
    let available = false;

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      //body: JSON.stringify({ username: username })
    };
    await fetch(`${endpoint}/email/?email=${email}`, requestOptions)
      .then(response => response.json())
      .then(data => (available = data.available));
    
    return available;
  }

  export default {
    mounted () {
      const elements = document.getElementsByClassName('prevent-tab')
      for (const elem of elements)
        elem.onkeydown = event => { if (event.keyCode == 0x09 && !event.shiftKey) return false; };
    },
    setup () {
      const formRef1 = ref(null)
      const formRef2 = ref(null)
      const formRef3 = ref(null)
      const message = useMessage()
      return {
        formRef1,
        formRef2,
        formRef3,
        size: 'large',
        model: ref({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          seller: false,
          address: '',
          phone: '',
        }),
        rules: {
          firstname: {
            required: true,
            message: 'Inserisca il suo nome',
            trigger: ['input', 'blur']
          },
          lastname: {
            required: true,
            message: 'Inserisca il suo cognome',
            trigger: ['input', 'blur']
          },
          username: {
            required: true,
            message: 'Inserisca il suo username',
            trigger: ['input', 'blur']
          },
          email: {
            required: true,
            message: 'Inserisca la sua email',
            trigger: ['input', 'blur']
          },
          password: {
            required: true,
            message: 'Inserisca la sua password',
            trigger: ['input', 'blur']
          },
          confirmPassword: {
            required: true,
            message: 'Confermi la sua password',
            trigger: ['input', 'blur']
          },
          seller: {
            required: true,
          },
          address: {
            required: false,
            message: 'Confermi il suo indirizzo',
            trigger: ['input', 'blur']
          },
          phone: {
            required: false,
            message: 'Confermi il suo numero di telefono',
            trigger: ['input', 'blur']
          }
        },
        loginRedirect () {
          window.location.replace('/login');
        },
        toggleRules (value) {
          formRef3.value.rules.address.required = value;
          formRef3.value.rules.phone.required = value;
        },
        handleValidateClick1 (event) {
          event.preventDefault()
          formRef1.value?.validate(async errors => {
            if (!errors) {
              let ok = true;
              const data = formRef1.value.model;

              let available = await UsernameAvailable(data.username);
              if (!available) {
                message.error('Username già in uso');
                ok = false;
              }

              if (!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                message.error('Email non valida');
                ok = false;
              }
              
              available = await EmailAvailable(data.email);
              if (!available) {
                message.error('Questa email non esiste');
                ok = false;
              }

              if (ok) {
                message.success('Campi validi')
                document.getElementById('next').click();
              }
            } else {
              message.error('Campi non validi')
            }
          })
        },
        handleValidateClick2 (event) {
          event.preventDefault()
          formRef2.value?.validate(errors => {
            if (!errors) {
              if (formRef2.value.model.password == formRef2.value.model.confirmPassword) {
                let ok = true;
                const data = formRef2.value.model;

                if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
                  message.error('La password non rispetta i requisiti');
                  ok = false;
                }

                if (ok) {
                  message.success('Campi validi')
                  document.getElementById('next').click();
                }
              } else {
                message.error('Le password non coincidono')
              }
            } else {
              message.error('Campi non validi')
            }
          })
        },
        handleValidateClick3 (event) {
          event.preventDefault()
          formRef3.value?.validate(async errors => {
            if (!errors) {
              let ok = true;
              const data = formRef3.value.model;

              data.phone = data.phone.replace(/\s/g, '');
              if (data.seller && !data.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
                message.error('Numero telefonico non valido');
                ok = false;
              }

              if (ok) {
                message.success('Campi validi');
                document.getElementById('next').click();

                const result = await CreateUser(data);
                if (!result) message.error('Errore durante la creazione dell\'account');
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
  <n-space align="center" style="min-height: calc(100vh - 64px);">
    <n-carousel show-arrow :show-dots="false">
      <n-space justify="center" align="center" style="gap: 50px; padding-top: 12vh; padding-bottom: 101px;">
        <img src="../images/Signup1.png"/>
        <n-form
          ref="formRef1"
          :model="model"
          :rules="rules"
          :size="size"
        >
          <n-card bordered style="width: 25vw;">
            <n-space vertical>
              <span class="t-h1">Signup</span>
              <n-space vertical>
                <n-form-item path="firstname" label="Nome">
                  <n-input
                    round
                    type="text"
                    v-model:value="model.firstname"
                  />
                </n-form-item>
                <n-form-item path="lastname" label="Cognome">
                  <n-input
                    round
                    type="text"
                    v-model:value="model.lastname"
                  />
                </n-form-item>
                <n-form-item path="username" label="Username">
                  <n-input
                    round
                    type="text"
                    v-model:value="model.username"
                  />
                </n-form-item>
                <n-form-item path="email" label="Email">
                  <n-input
                    round
                    type="email"
                    v-model:value="model.email"
                  />
                </n-form-item>
              </n-space>
              <n-space vertical style="gap: 20px;">
                <n-space vertical align="stretch">
                  <n-button round size="large" type="primary" block @click="handleValidateClick1">Registrati</n-button>
                </n-space>
                <n-space vertical align="stretch">
                  <span class="t-small">Possiedi già un account?</span>
                  <n-button class="prevent-tab" round size="large" type="info" block @click="loginRedirect">Accedi</n-button>
                </n-space>
              </n-space>
            </n-space>
          </n-card>
        </n-form>
      </n-space>
      <n-space justify="center" align="center" style="gap: 50px; padding-top: 12vh; padding-bottom: 101px;">
        <img src="../images/Signup2.png"/>
        <n-form
          ref="formRef2"
          :model="model"
          :rules="rules"
          :size="size"
        >
          <n-card bordered style="width: 25vw;">
            <n-space vertical>
              <span class="t-h1">Signup</span>
              <n-space vertical>
                <n-form-item path="password" label="Password">
                  <n-input
                    round
                    type="password"
                    v-model:value="model.password"
                    show-password-on="mousedown"
                  />
                </n-form-item>
                <n-form-item path="confirmPassword" label="Conferma Password">
                  <n-input
                    round
                    type="password"
                    v-model:value="model.confirmPassword"
                    show-password-on="mousedown"
                  />
                </n-form-item>
              </n-space>
              <n-space vertical style="gap: 20px;">
                <n-space vertical align="stretch">
                  <n-button class="prevent-tab" round size="large" type="primary" block @click="handleValidateClick2">Continua</n-button>
                  <span class="t-small">La password deve essere lunga almeno 8 caratteri, contenere almeno una maiuscola, una minuscola, un numero ed uno dei seguenti caratteri speciali !@#$%^&*</span>
                </n-space>
              </n-space>
            </n-space>
          </n-card>
        </n-form>
      </n-space>
      <n-space justify="center" align="center" style="gap: 50px; padding-top: 12vh; padding-bottom: 101px;">
        <img src="../images/Signup3.png"/>
        <n-form
          ref="formRef3"
          :model="model"
          :rules="rules"
          :size="size"
        >
          <n-card bordered style="width: 25vw;">
            <n-space vertical>
              <span class="t-h1">Signup</span>
              <n-space vertical>
                <n-form-item path="seller">
                  <n-checkbox v-model:checked="model.seller" @update:checked="toggleRules(model.seller)">
                    Voglio vendere su Skupply
                  </n-checkbox>
                </n-form-item>
                <n-form-item path="address" label="Indirizzo">
                  <n-input
                    round
                    type="text"
                    :disabled="!model.seller"
                    v-model:value="model.address"
                  />
                </n-form-item>
                <n-form-item path="phone" label="Telefono">
                  <n-input
                    round
                    type="text"
                    :disabled="!model.seller"
                    v-model:value="model.phone"
                  />
                </n-form-item>
              </n-space>
              <n-space vertical style="gap: 20px;">
                <n-space vertical align="stretch">
                  <span class="t-small">Sei indeciso? Nessun problema, potrai completare il tuo profilo e diventare venditore anche in un secondo momento</span>
                  <n-button class="prevent-tab" round size="large" type="primary" block @click="handleValidateClick3">Continua</n-button>
                  <span class="t-small">Confermando l’iscrizione si dichiara di aver preso visione ed accettato i <a href="/terms" target="_blank" style="color: #404040; font-weight: 500">termini e le condizioni</a></span>
                </n-space>
              </n-space>
            </n-space>
          </n-card>
        </n-form>
      </n-space>
      <n-space vertical justify="center" align="center" style="gap: 50px; padding-top: 12vh; padding-bottom: 101px;">
        <img src="../images/Signup4.png"/>
        <n-space vertical>
          <span class="t-h1">Registrazione completata!</span>
          <span class="t-large">Controlla la tua email per attivare l'account</span>
        </n-space>
      </n-space>
      <template #arrow="{ prev, next }">
        <div id="prev" @click="prev" style="display: none;"></div>
        <div id="next" @click="next" style="display: none;"></div>
      </template>
    </n-carousel>
  </n-space>
</template>

<style scoped>
</style>