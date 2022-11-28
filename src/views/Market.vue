<script>
// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

// Files imports 
import theme from '../assets/theme'

// Components imports
import Card from '../components/MarketCard.vue'
import Search from '../components/images/Search.vue'
import { Icon } from '@vicons/utils'
import { SearchOutline } from '@vicons/ionicons5'

let message = null
let options = [
  { label: 'Tutte le categorie', value: '' }
]

const searchForm = ref(null)
const searchModel = ref({ query: '', category: '', location: '' })

// Form attributes rules
const searchRules = {
  query: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Inserisca un termine di ricerca')

      return true
    },
    trigger: ['input', 'blur']
  },
  category: {
    required: false,
    trigger: ['input', 'blur']
  },
  location: {
    required: false,
    trigger: ['input', 'blur']
  }
}

export default {
  data() {
    return {
      theme,
      options,
      decorationStyle: { backgroundColor: theme.common.primaryColor },
      hStyle: { lineHeight: '2rem', color: theme.common.foreground },
    }
  },
  setup() {
    message = useMessage()

    return {
      searchForm,
      searchModel,
      searchRules,
    }
  },
  components: {
    Card,
    Icon, 
    Search,
    SearchOutline
  },
  methods: {
    validateSearch() {
      searchForm.value?.validate(error => {
        if (error) { message.error('Campi non validi'); return true }

        const query = this.searchModel.query
        const category = this.searchModel.category
        const location = this.searchModel.location

        let url = `search/?query=${query}`
        if (categery) url += `&category=${category}`
        if (location) url += `&location=${location}`

        this.$router.push(url)
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <n-grid cols="1 m:2" responsive="screen" class="container decoration" y-gap="40px" :style="decorationStyle">
    <n-grid-item class="items">
      <n-space vertical>
        <n-h3 :style="hStyle">Nuova ricerca</n-h3>
        <n-card style="min-width: 400px; margin-top: 10px; border-radius: 25px;">
          <n-form ref="searchForm" :model="searchModel" :rules="searchRules">
            <n-form-item path="query" label="Cosa cerchi?">
              <n-input v-model:value="searchModel.query" round/>
            </n-form-item>
            <n-form-item path="category" label="In quale categoria?">
              <n-select v-model:value="searchModel.category" :options="options"/>
            </n-form-item>
            <n-form-item path="location" label="Dove?">
              <n-input v-model:value="searchModel.location"/>
            </n-form-item>
          </n-form>
          <n-button round size="large" type="info">
            <n-space align="center" @click="validateSearch">
              <Icon size="20" :color="theme.common.foreground"><SearchOutline /></Icon>
              Cerca
            </n-space>
          </n-button>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item class="items">
      <Search size="350" />
    </n-grid-item>
  </n-grid>
  <n-space class="container" vertical align="center">
    <n-h3 style="padding-bottom: 25px;">Esplora le nostre categorie</n-h3>
    <n-grid cols="1 m:2 l:4" responsive="screen" x-gap="32px" y-gap="32px" style="width: fit-content;">
      <n-grid-item>
        <Card
          subtitle="Scuole"
          title="Elementari"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          button="Seleziona"
        />
      </n-grid-item>
      <n-grid-item>
        <Card
          subtitle="Scuole"
          title="Elementari"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          button="Seleziona"
        />
      </n-grid-item>
      <n-grid-item>
        <Card
          subtitle="Scuole"
          title="Elementari"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          button="Seleziona"
        />
      </n-grid-item>
      <n-grid-item>
        <Card
          subtitle="Scuole"
          title="Elementari"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          button="Seleziona"
        />
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped>
.container {
  padding: 50px calc(15vw - 100px);
  box-sizing: border-box;
}

.decoration {
  flex-wrap: nowrap;
  background-size: 100% 100%;
  background-position: 0 100px;
  background-repeat: no-repeat;
  background-image: url("../assets/images/Decoration.svg");
}

.items {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
