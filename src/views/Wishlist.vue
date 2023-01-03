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
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
    body: JSON.stringify({email: user.data.email})
  }

  /* Backend refactoring required
  const result = await fetch(`${server.userEndpoint}/wishlist/?username=${user.data.username}`, options)
    .then(response => {
      if (response.status != 200) return null
      return response.json()
    })
  */

  const result = await fetch(`${server.wishlistEndpoint}`, options).then(response => response.json());
  return result;
}

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      theme,
      items: [],
      itemsIds: [],
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
    this.items = response.wishlist,
    this.itemsIds = response.wishlist_ids
  },
  components: {
    EmptyWishlist,
    Heart24Filled,
    Icon,
    ProductCard
  },
  computed: {
    async checkIsCart(){

    }
  },
  methods: {
    async addToCart(productId) {
      const user = useUserStore()
      const server = useServerStore()

      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
        body: JSON.stringify({ email: user.data.email, id: productId })
      }

      /* Backend refactoring required
      const result = await fetch(`${server.userEndpoint}/cart`, options)
        .then(response => {
          if (response.status != 200) return
          return response.json()
        })
      */

      const result = await fetch(`${server.cartEndpoint}/add`, options).then(response => response.json());

      return result;
    },
    async removeItem(productId) {
      const user = useUserStore()
      const server = useServerStore()

      const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
          body: JSON.stringify({
              email: user.data.email,
              id: productId
          })
      };

      const result = await fetch(`${server.wishlistEndpoint}`, requestOptions)
      .then(response => {
          response.json();
          if(response.status == 200){
            //se la risposta ha esito positivo, elimino dagli array items e itemsIds il prodotto corrispondente
            this.items = this.items.filter(item => item._id != productId);
            this.itemsIds = this.itemsIds.filter(itemId => itemId._id != productId);
          }
      })
    }
  }
}
</script>

<template>
  <n-space v-if="items.length" vertical class="container" size="large" align="center">
    <ProductCard v-for="item in items"
      :id="item._id"
      :title="item.title"
      :quantity="item.quantity"
      :selected="item.selected"
      :price="parseFloat(item.price['$numberDecimal'])"
      :shipping="item.shipping"
      :location="(item.handDeliverZone ? item.handDeliverZone : '')"
      :image="item.photos[0]"
      style="width: calc(15vw + 500px);"
    >
      <n-space size="large" align="center" style="flex-wrap: nowrap;">
        <n-button v-if="!itemsIds[items.indexOf(item)].isCart" round size="large" type="primary" @click="!itemsIds[items.indexOf(item)].isCart ? addToCart(item._id) : null">Aggiungi al carrello</n-button>
        <n-button round type="info" style="width: 40px; height: 40px; padding: 0;" @click="removeItem(item._id)">
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
