<script>
// Packages imports
import { computed, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'

// Files imports 
import theme from '../assets/theme'

// States imports
import { useServerStore } from '../stores/server'

let message = null
const signupForm = ref(null)
const signupModel = ref({ sell: false, address: '', prefix: '', phone: '', terms: false })

const prefixes = [ // Prefissi telefonici in europa
  {label: '+39', value: '39'}, {label: '+7', value: '7'}, {label: '+30', value: '30'},
  {label: '+31', value: '31'}, {label: '+32', value: '32'}, {label: '+33', value: '33'},
  {label: '+34', value: '34'}, {label: '+36', value: '36'}, {label: '+40', value: '40'},
  {label: '+41', value: '41'}, {label: '+43', value: '43'}, {label: '+44', value: '44'},
  {label: '+45', value: '45'}, {label: '+46', value: '46'}, {label: '+47', value: '47'},
  {label: '+48', value: '48'}, {label: '+49', value: '49'}, {label: '+90', value: '90'},
  {label: '+298', value: '298'}, {label: '+350', value: '350'}, {label: '+351', value: '351'},
  {label: '+352', value: '352'}, {label: '+353', value: '353'}, {label: '+354', value: '354'},
  {label: '+355', value: '355'}, {label: '+356', value: '356'}, {label: '+357', value: '357'},
  {label: '+358', value: '358'}, {label: '+359', value: '359'}, {label: '+370', value: '370'},
  {label: '+371', value: '371'}, {label: '+372', value: '372'}, {label: '+373', value: '373'},
  {label: '+374', value: '374'}, {label: '+375', value: '375'}, {label: '+376', value: '376'},
  {label: '+377', value: '377'}, {label: '+378', value: '378'}, {label: '+380', value: '380'},
  {label: '+381', value: '381'}, {label: '+382', value: '382'}, {label: '+383', value: '383'},
  {label: '+385', value: '385'}, {label: '+386', value: '386'}, {label: '+387', value: '387'},
  {label: '+389', value: '389'}, {label: '+420', value: '420'}, {label: '+421', value: '421'},
  {label: '+423', value: '423'}, {label: '+995', value: '995'},
]

function styleAutocomplete(value) {
  const address = document.querySelector('.geoapify-autocomplete-input')
  address.style.cursor = value ? 'auto' : 'not-allowed'
  address.disabled = !value
}

async function createUser(data) {
  const server = useServerStore();
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  /* Backend refactoring required
  const result = await fetch(server.userEndpoint, options)
    .then(response => {
      if (response.status != 200) return null
      return response.json()
    })
  */
  const result = { code: 0x0100, message: 'User created successfully' }
  
  return result
}

// Form attributes rules
const signupRules = {
  sell: {
    validator(rule, value) {
      styleAutocomplete(value)
    },
    trigger: 'change'
  },
  address: {
    key: 'address',
    required: true,
    validator(rule, value) {
      if (!signupForm.value.model.sell) return true
      const input = document.querySelector('.autocomplete-container').querySelector('input')

      const address = signupModel.address
      if (!(address && input.value))
        return new Error('Indirizzo di residenza non valido')
      else if (!address.housenumber)
        return new Error('L\'indirizzo inserito non contiene un numero civico')

      return true
    },
    trigger: ['input', 'blur']
  },
  prefix: {
    required: true,
    validator(rule, value) {
      if (!signupForm.value.model.sell) return true

      if (!prefixes.some(prefix => prefix.value == value))
        return new Error('Prefisso non valido')

      return true
    },
    trigger: 'change'
  },
  phone: {
    required: true,
    validator(rule, value) {
      if (!signupForm.value.model.sell) return true

      if (value.length != 10)
        return new Error('Il numero di telefono deve contenere 10 cifre')

      return true
    },
    trigger: ['input', 'blur']
  },
  terms: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Campo richiesto')

      return true
    },
    trigger: 'change'
  }
}

export default {
  data() {
    const color = '#000000A0'
    return {
      prefixes,
      disabled: false,
      textStyle: { color: color, fontSize: '0.85rem' },
      linkStyle: { color: theme.Typography.pTextColor }
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
  mounted() {
    const address = this.$refs.address
    const autocomplete = new GeocoderAutocomplete(
      address, '7a1620f8c3ab45f28b146b9d0a52018d', 
      { filter: { countrycode: ['it'] }}
    )

    styleAutocomplete(false)

    address.querySelector('input').addEventListener('input', () =>{
      signupForm.value?.validate(errors => {}, rule => rule?.key == 'address').catch(() => {})
    })

    autocomplete.on('select', (location) => {
      signupModel.address = location.properties
      signupForm.value?.validate(errors => {}, rule => rule?.key == 'address').catch(() => {})
    })
  },
  props: {
    data: { type: Object, required: true }
  },
  methods: {
    onlyNumber(value) { return !value || (value.match(/^\d+$/) && value.length <= 10) },
    continueSignup() {
      signupForm.value?.validate(async error => {
        if (error) { message.error('Campi non validi'); return true }
        const sell = this.signupModel.sell
        const address = sell ? this.signupModel.address : null
        const phone = sell ? (this.signupModel.prefix + ' ' + this.signupModel.phone) : null
        const terms = this.signupModel.terms

        this.disabled = true
        let verifing = message.create('Verifica in corso', { type: 'loading', duration: 0 })

        const response = await createUser({...this.data, sell, address, phone, terms})

        if (response) {
          verifing.type = 'success'
          verifing.content = 'Registrato con successo'

          this.$emit('submit', {})
        } else {
          verifing.type = 'error'
          verifing.content = 'Errore durante la registrazione'
          this.$router.push('/')
        }

        setTimeout(verifing.destroy, 3000)
        this.disabled = false
      }).catch(() => {})
    }
  },
}
</script>

<template>
  <n-space vertical size="large">
    <n-h1>Signup</n-h1>

    <n-form ref="signupForm" :model="signupModel" :rules="signupRules">
      <n-space vertical size="large">
        <n-form-item path="sell" :show-label="false">
          <n-checkbox v-model:checked="signupModel.sell">Voglio vendere su Skupply</n-checkbox>
        </n-form-item>
        <n-form-item path="address" label="Indirizzo">
          <div ref="address" class="autocomplete-container"></div>
        </n-form-item>
        <n-space style="flex-wrap: nowrap;" block>
          <n-form-item path="prefix" label="Prefisso">
            <n-select :disabled="!signupModel.sell" v-model:value="signupModel.prefix" :options="prefixes" style="min-width: 80px;"/>
          </n-form-item>
          <n-form-item path="phone" label="Telefono">
            <n-input :disabled="!signupModel.sell" v-model:value="signupModel.phone" round :allow-input="onlyNumber"/>
          </n-form-item>
        </n-space>
        <n-p :style="textStyle">Sei indeciso? Nessun problema, potrai completare il tuo profilo e diventare venditore anche in un secondo momento</n-p>
        <n-form-item path="terms" :show-label="false">
          <n-checkbox v-model:checked="signupModel.terms">Accetto <a href="/terms" target="_blank" :style="linkStyle">termini e condizioni d'uso</a></n-checkbox>
        </n-form-item>
      </n-space>
    </n-form>

    <n-button :disabled="disabled" round block type="primary" size="large" @click="continueSignup">Registrati</n-button>
  </n-space>
</template>

<style>
.n-form-item .n-form-item-blank {
  display: block;
}

.geoapify-autocomplete-input {
  padding: 0 12px 0 12px;
  width: calc(100% - var(--n-padding-left));
  flex-basis: 100%;
  height: 32px;
  font-size: 14px;
  outline: none;
  border-radius: 50px;
  border: 1px solid #00000023;
  transition: all .25s ease-in-out;
}

.geoapify-autocomplete-input:disabled {
  background-color: #00000004;
  border: 1px solid #00000018;
  color: #00000030;
}

.geoapify-autocomplete-input::placeholder {
  transition: all .25s ease-in-out;
  color: #00000050;
}

.geoapify-autocomplete-input:disabled::placeholder {
  color: #00000030;
}

.geoapify-autocomplete-items {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;

  background-color: #FEFEFE;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.geoapify-autocomplete-items div {
  padding: 10px;
  cursor: pointer;
}

.geoapify-autocomplete-items div:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.geoapify-autocomplete-items .active {
  background-color: rgba(0, 0, 0, 0.1);
}

.geoapify-autocomplete-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.geoapify-autocomplete-item .icon {
  display: inline-block;
  width: 40px;
  height: 24px;
  color: #aaa;
}

.geoapify-autocomplete-item .icon.emoji {
  color: unset;
  font-size: 20px;
  opacity: 0.9;
}

.geoapify-close-button {
  display: none;
}

.geoapify-close-button.visible {
  display: none;
}

.geoapify-close-button {
  display: none;
}

.geoapify-close-button:hover {
  display: none;
}

.geoapify-autocomplete-items .main-part .non-verified {
  color:  #ff4848;
}

.geoapify-autocomplete-items .secondary-part {
  margin-left: 10px;
  font-size: small;
  color: rgba(0, 0, 0, 0.6);
}

.autocomplete-container {
  position: relative;
}
</style>
