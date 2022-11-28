<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Files imports
import theme from '../assets/theme'

// Components imports
import ProductCard from '../components/ProductCard.vue'
import EmptyCart from '../components/images/EmptyCart.vue'
import { Icon } from '@vicons/utils'
import { TrashOutline } from '@vicons/ionicons5'

async function getCartItems() {
  const user = useUserStore()
  const server = useServerStore()

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
  }

  /* Backend refactoring required
  const result = await fetch(`${server.userEndpoint}/cart/?username=${user.data.username}`, options)
    .then(response => {
      if (response.status != 200) return null
      return response.json()
    })
  */

  const result = { code: 0x0500, message: 'Cart retrieved successfully', cart: [
    { id: '01234', title: 'Matita', quantity: 20, selected: 10, price: 1.00, shipping: 0.25, location: 'Trento TN', image: 'https://www.leuchtturm1917.com/media/productdetail/700x700/801153/pencil.jpg' },
    { id: '56789', title: 'Gomma', quantity: 10, selected: 5, price: 2.00, shipping: 0.40, location: 'Belluno BL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLMnLwC4xPqMvjU8udGLs9EIbPKgWbNO17g&usqp=CAU' }
  ]}

  return result
}

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      theme,
      items: [],
      smallLabel,
      priceStyle: { lineHeight: '2rem', color: theme.common.infoColor }
    }
  },
  async mounted() {
    const response = await getCartItems()
    this.items = response.cart
  },
  components: {
    EmptyCart,
    Icon,
    ProductCard,
    TrashOutline
  },
  computed: {
    fullPrice() {
      return this.items.reduce((sum, item) => {
        return sum + item.price * item.selected + (item.selected ? item.shipping : 0)
      }, 0)
    },
    shippingPrice() {
      return this.items.reduce((sum, item) => {
        return sum + (item.selected ? item.shipping : 0)
      }, 0)
    }
  },
  methods: {
    async removeItem(productId) {
      const user = useUserStore()
      const server = useServerStore()

      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
      }

      /* Backend refactoring required
      const result = await fetch(`${server.userEndpoint}/cart/?id=${productId}`, options)
        .then(response => {
          if (response.status != 200) return
          return response.json()
        })
      */

      const result = { code: 0x0300, message: 'Item removed successfully' }

      if (result) this.items = this.items.filter(item => item.id != productId)
    }
  }
}
</script>

<template>
  <n-space v-if="items.length" class="container" justify="space-evenly">
    <n-space vertical size="large">
      <ProductCard v-for="item in items"
        :id="item.id"
        :title="item.title"
        :quantity="item.quantity"
        :selected="item.selected"
        :price="item.price"
        :shipping="item.shipping"
        :location="item.location"
        :image="item.image"
        style="width: calc(20vw + 400px);"
      >
        <n-space size="large" align="center" style="flex-wrap: nowrap;">
          <n-input-number
            style="width: 100px;"
            button-placement="both"
            min="0" :max="item.quantity"
            v-model:value="item.selected"
            :default-value="item.selected"
          />
          <n-button round type="info" style="width: 40px; height: 40px; padding: 0;" @click="removeItem(item.id)">
            <Icon size="20" :color="theme.common.foreground"><TrashOutline/></Icon>
          </n-button>
        </n-space>
      </ProductCard>
    </n-space>

    <n-space vertical>
      <n-h3>Totale ordine</n-h3>
      <n-h2 :style="priceStyle">€ {{fullPrice.toFixed(2)}}</n-h2>
      <n-text :style="{ fontWeight: 600, color: smallLabel }">di cui € {{shippingPrice.toFixed(2)}} di spedizione</n-text>
      <n-button :disabled="fullPrice == 0" round block size="large" type="primary" style="margin-top: 25px;">Procedi al checkout</n-button>
    </n-space>

  </n-space>
  <n-space v-else class="container" justify="space-evenly" align="center">
    <n-space vertical size="large" justify="center" align="center">
      <EmptyCart size="400"/>
      <n-space vertical style="margin: 25px 0;">
        <n-h3 style="line-height: 2rem;">Sembra che il carrello sia vuoto</n-h3>
        <n-p>Scopri subito tutti i nostri prodotti nella sezione marketplace!</n-p>
      </n-space>
      <n-button round size="large" type="primary" @click="this.$router.push('/market')">Visita il negozio</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  height: calc(100vh - 64px);
  padding: 50px calc(25vw - 200px);
  box-sizing: border-box;
}
</style>
