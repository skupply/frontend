<script>
// Packages imports
import { useMessage } from 'naive-ui'

// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Files imports
import theme from '../assets/theme'

// Components imports
import ProductCard from '../components/ProductCard.vue'
import EmptyWishlist from '../components/images/EmptyWishlist.vue'
import { Icon } from '@vicons/utils'
import { Heart24Filled } from '@vicons/fluent'

async function getWishlistItems() {
  const user = useUserStore()
  const server = useServerStore()

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
  }

  /* Backend refactoring required
  const result = await fetch(`${server.userEndpoint}/wishlist/?username=${user.data.username}`, options)
    .then(response => {
      if (response.status != 200) return null
      return response.json()
    })
  */

  const result = { code: 0x0500, message: 'Wishlist retrieved successfully', wishlist: [
    { id: '01234', title: 'Matita', cart: false, price: 1.00, shipping: 0.25, location: 'Trento TN', image: 'https://www.leuchtturm1917.com/media/productdetail/700x700/801153/pencil.jpg' },
    { id: '56789', title: 'Gomma', cart: true, price: 2.00, shipping: 0.40, location: 'Belluno BL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLMnLwC4xPqMvjU8udGLs9EIbPKgWbNO17g&usqp=CAU' }
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
  setup() {
    return {
      message: useMessage(),
    }
  },
  async mounted() {
    const response = await getWishlistItems()
    this.items = response.wishlist
  },
  components: {
    EmptyWishlist,
    Heart24Filled,
    Icon,
    ProductCard
  },
  methods: {
    async addToCart(productId) {
      const user = useUserStore()
      const server = useServerStore()

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
        body: JSON.stringify({ productId })
      }

      /* Backend refactoring required
      const result = await fetch(`${server.userEndpoint}/cart`, options)
        .then(response => {
          if (response.status != 200) return
          return response.json()
        })
      */

      const result = { code: 0x0300, message: 'Item added successfully' }

      if (result) {
        this.items.forEach(item => { if (item.id == productId) item.cart = false })
        this.message.success('Prodotto aggiunto al carrello')
      }
    },
    async removeItem(productId) {
      const user = useUserStore()
      const server = useServerStore()

      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
      }

      /* Backend refactoring required
      const result = await fetch(`${server.userEndpoint}/wishlist/?id=${productId}`, options)
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
  <n-space v-if="items.length" vertical class="container" size="large" align="center">
    <ProductCard v-for="item in items"
      :id="item.id"
      :title="item.title"
      :quantity="item.quantity"
      :selected="item.selected"
      :price="item.price"
      :shipping="item.shipping"
      :location="item.location"
      :image="item.image"
      style="width: calc(15vw + 500px);"
    >
      <n-space size="large" align="center" style="flex-wrap: nowrap;">
        <n-button v-if="item.cart" round size="large" type="primary" @click="item.cart ? addToCart(item.id) : null">Aggiungi al carrello</n-button>
        <n-button round type="info" style="width: 40px; height: 40px; padding: 0;" @click="removeItem(item.id)">
          <Icon size="20" :color="theme.common.foreground"><Heart24Filled/></Icon>
        </n-button>
      </n-space>
    </ProductCard>
  </n-space>
  <n-space v-else class="container" justify="space-evenly" align="center">
    <n-space vertical size="large" justify="center" align="center">
      <EmptyWishlist size="350"/>
      <n-space vertical style="margin: 25px 0;">
        <n-h3 style="line-height: 2rem;">Sembra che la tua wishlist sia vuota</n-h3>
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
