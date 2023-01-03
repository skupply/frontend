<script>
// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

// Components imports
import { Icon } from '@vicons/utils'
import { ImageOutline } from '@vicons/ionicons5'

// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

let message = null
const productForm = ref(null)
const productModel = ref({
  title: '',
  description: '',
  category: '',
  city: '',
  conditions: '',
  quantity: 1,
  price: 1.00,
  shipmentCost: 0.00,
  pickup: false,
  shipment: false
})

// Form attributes rules
const productRules = {
  title: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca un titolo')
      else if (value.length < 8)
        return new Error('Il titolo deve contenere almeno 8 caratteri')

      return true
    },
    trigger: ['input', 'blur']
  },
  description: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca una descrizione')

      return true
    },
    trigger: ['input', 'blur']
  },
  city: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca una città')

      return true
    },
    trigger: ['input', 'blur']
  },
  price: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca un prezzo')

      return true
    },
    trigger: ['input', 'blur']
  },
  shipmentCost: {
    required: false,
    validator(rule, value) {
      if (!value && value != 0)
        return new Error('Inserisca un costo')

      return true
    },
    trigger: ['input', 'blur']
  },
  quantity: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca una quantità')

      return true
    },
    trigger: ['input', 'blur']
  },
  category: {
    required: true,
    validator(rule, value) {
      if (!value && value !== '')
        return new Error('Selezioni una categoria')

      return true
    },
    trigger: ['input', 'blur']
  },
  conditions: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Selezioni una condizione')

      return true
    },
    trigger: ['input', 'blur']
  },
}

async function getCategories(){
  const user = useUserStore()
  const server = useServerStore()
  
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
  };

  const result = await fetch(`${server.searchEndpoint}/categories`, requestOptions).then(response => response.json())

  return result;
}

export default {
  data() {
    const color = '#000000A0'
    const user = useUserStore()
    const conditions = [
      { label: 'Nuovo', value: 'NEW' },
      { label: 'Come nuovo', value: 'LIKE_NEW' },
      { label: 'Buone condizioni', value: 'GOOD' },
      { label: 'Usato', value: 'USED' },
    ]

    return {
      user,
      color,
      file: null,
      image: null,
      options: [],
      disabled: false,
      conditions: conditions,
      textStyle: { color: color, fontSize: '0.85rem' }
    }
  },
  async mounted(){
    const result = await getCategories();

    this.options.push({ label: 'Tutte le categorie', value: '' });
    result.categories.forEach(element => {
      this.options.push({label: element.title, value: element.title});
    });
  },
  components: {
    Icon,
    ImageOutline,
  },
  methods: {
    loadFile(event) {
      [this.file] = this.$refs.input.files
      if (this.file) this.image = URL.createObjectURL(this.file)
    },
    async validateProduct() {
      productForm.value?.validate(async error => {
        if (error) { message.error('Campi non validi'); return true }
        else if (!this.file) { message.error('Selezionare un file'); return true }

        const extRegex = /(?:\.([^.]+))?$/;
        const ext = extRegex.exec(this.file.name)[1];
        const extensions = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']

        if (!ext || !extensions.includes(ext)) { message.error('Selezionare una immagine'); return true; }
        
        let valid = true
        let verifing = message.create('Creazione in corso', { type: 'loading', duration: 0 })

        const user = useUserStore()
        const server = useServerStore()
        const categories = this.productModel.category;

        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('title', this.productModel.title);
        formData.append('description', this.productModel.description);
        formData.append('ownerId', user.data.id);
        formData.append('quantity', this.productModel.quantity);
        formData.append('conditions', this.productModel.conditions);
        formData.append('price', this.productModel.price);
        formData.append('city', this.productModel.city);
        formData.append('pickUpAvail', this.productModel.pickup);
        formData.append('shipmentAvail', this.productModel.shipment);
        formData.append('shipmentCost', this.productModel.shipmentCost);
        formData.append('ext', ext);

        if (categories == '') {
          const [, ...list] = categories
          formData.append('categories', list);
        } else formData.append('categories', [categories])

        const requestOptions = {
          method: 'POST',
          headers: { 'x-access-token': user.token },
          body: formData
        }

        const response = await fetch(`${server.productEndpoint}`, requestOptions).then(response => response.json())
        if (response.code == 900) {
          const id = response.item
          const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
            body: JSON.stringify({itemId: id})
          }

          const result = await fetch(`${server.productEndpoint}/publish`, options).then(response => response.json())
          if (result.code == 900) {
            verifing.type = 'success'
            verifing.content = 'Prodotto pubblicato con successo'
            this.$router.push(`item/id=${id}`)
          } else valid = false;
        } else valid = false;

        if (!valid) {
          verifing.type = 'error'
          verifing.content = 'Errore durante la creazione'
        }

        setTimeout(verifing.destroy, 3000)
      }).catch(() => {})
    }
  },
  setup() {
    message = useMessage()
    return {
      productForm,
      productModel,
      productRules,
    }
  }
}
</script>

<template>
  <n-space class="container" v-if="user.data.isSeller" justify="center" align="center">
    <n-form ref="productForm" :model="productModel" :rules="productRules">
      <n-space vertical>
        <n-space justify="space-between">
          <n-space vertical>
            <img v-if="image" class="image" @click="this.$refs.input.click()" :src="image"/>
            <label v-else for="product" class="image">
              <Icon size="25" color="#00000040"><ImageOutline/></Icon>
            </label>
            <input id="product" ref="input" type="file" @change="loadFile(event)" style="display: none;"/>
          </n-space>

          <n-space vertical size="large">
            <n-form-item path="title" label="Titolo">
              <n-input v-model:value="productModel.title" round/>
            </n-form-item>
            <n-form-item path="description" label="Descrizione">
              <n-input type="textarea" v-model:value="productModel.description" rows="2" round/>
            </n-form-item>
            <n-space>
              <n-form-item path="pickup" :show-label="false">
                <n-checkbox v-model:checked="productModel.pickup">Ritiro in persona</n-checkbox>
              </n-form-item>
              <n-form-item path="shipment" :show-label="false">
                <n-checkbox v-model:checked="productModel.shipment">Spedizione disponibile</n-checkbox>
              </n-form-item>
            </n-space>
          </n-space>
        </n-space>
        <n-space justify="space-between">
          <n-form-item path="category" label="Categoria">
            <n-select v-model:value="productModel.category" :options="options" style="width: 250px;"/>
          </n-form-item>
          <n-space>
            <n-form-item path="price" label="Prezzo">
              <n-input-number
                min="0" style="width: 100px;"
                button-placement="both" v-model:value="productModel.price"
                :default-value="1"
              />
            </n-form-item>
            <n-form-item path="quantity" label="Quantità">
              <n-input-number
                min="1" style="width: 100px;"
                button-placement="both" v-model:value="productModel.quantity"
                :default-value="1"
              />
            </n-form-item>
            <n-form-item path="shipmentCost" label="Costo spedizione">
              <n-input-number
                :disabled="!this.productModel.shipment"
                min="0" style="width: 100px;"
                button-placement="both" v-model:value="productModel.shipmentCost"
                :default-value="0"
              />
            </n-form-item>
          </n-space>
        </n-space>
        <n-space justify="space-between" align="center">
          <n-form-item path="city" label="Città">
            <n-input v-model:value="productModel.city" round/>
          </n-form-item>
          <n-form-item path="conditions" label="Condizioni">
            <n-select v-model:value="productModel.conditions" :options="conditions" style="width: 250px;"/>
          </n-form-item>
          <n-button round block type="primary" size="large" @click="validateProduct">Pubblica</n-button>
        </n-space>
      </n-space>
    </n-form>
  </n-space>
  <n-space v-else class="container" size="large" align="center">
    <n-space vertical size="large" align="center" style="margin: 25px 0;">
      <n-h3 style="line-height: 2rem;">Non sei neancora pronto!</n-h3>
      <n-p>Il tuo account non è neancora abilitato alla vendita. Aggiungi le informazioni necessarie per iniziare a vendere nella sezione profilo</n-p>
      <n-button round size="large" type="primary" @click="this.$router.push('/profile')">Visita il profilo</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  padding: 50px calc(25vh - 50px);
  box-sizing: border-box;
}

.image {
  display: grid;
  place-items: center;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #00000010;
  border: 1px solid #00000040;
}
</style>
