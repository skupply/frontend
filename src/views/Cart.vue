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
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
    body: JSON.stringify({email: user.data.email})
  }

  const result = await fetch(`${server.cartEndpoint}`, options).then(response => response.json());

  // Add server path to images
  result.cart.forEach(item => {
    item.photos.forEach(photo => {
      photo = server.productsMedia + '/images/' + photo
    })
  })

  return result;
}

export default {
  data() {
    const smallLabel = '#00000060'
    
    return {
      theme,
      smallLabel,
      items: [], // Array contenente il modello degli articoli
      itemsIds: [], // Array contenente una coppia id_articolo e quantità
      priceStyle: { lineHeight: '2rem', color: theme.common.infoColor }
    }
  },
  async mounted() {
    const response = await getCartItems()
    this.items = response.cart
    this.itemsIds = response.cart_ids
  },
  components: {
    EmptyCart,
    Icon,
    ProductCard,
    TrashOutline
  },
  computed: {
    fullPrice() {
      return this.items.reduce((sum, item, index) => {
        return sum + parseFloat(item.price['$numberDecimal']) * this.itemsIds[index].quantity + (this.itemsIds[index].quantity ? parseFloat(item.shipmentCost['$numberDecimal']) : 0)
      }, 0)
    },
    shippingPrice() {
      return this.items.reduce((sum, item, index) => {
        return sum + (this.itemsIds[index].quantity ? parseFloat(item.shipmentCost['$numberDecimal']) : 0)
      }, 0)
    }
  },
  methods: {
    //aggiornamento quantità elemento carrello
    async updateItemQuantity(productId, quantity){
      const user = useUserStore()
      const server = useServerStore()

      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
          body: JSON.stringify({
              email: user.data.email,
              id: productId,
              quantity: quantity
          })
      };

      const result = await fetch(`${server.cartEndpoint}`, requestOptions)
      .then(response => {
          response.json();
      })
    },
    //rimozione elemento dal carrello
    async removeItem(productId){
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

      const result = await fetch(`${server.cartEndpoint}`, requestOptions)
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
  <n-space v-if="items.length" class="container" justify="space-evenly">
    <n-space vertical size="large">
      <ProductCard v-for="item in items"
        :id="item._id"
        :title="item.title"
        :quantity="item.quantity"
        :selected="item.selected"
        :price="parseFloat(item.price['$numberDecimal'])"
        :shipping="parseFloat(item.shipmentCost['$numberDecimal'])"
        :location="(item.pickUpAvail ? item.city : '')"
        :image="item.photos[0]"
        style="width: calc(20vw + 400px);"
      >
        <n-space size="large" align="center" style="flex-wrap: nowrap;">
          <n-input-number
            style="width: 100px;"
            button-placement="both"
            min="0" :max="item.quantity"
            v-model:value="itemsIds[items.indexOf(item)].quantity"
            :default-value="itemsIds[items.indexOf(item)].quantity"
            @update:value="updateItemQuantity(item._id, itemsIds[items.indexOf(item)].quantity)"
          /><!--per la quantità, si fa accesso all'array itemsIds-->
          <n-button round type="info" style="width: 40px; height: 40px; padding: 0;" @click="removeItem(item._id)">
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
  min-height: calc(100vh - 64px);
  row-gap: 33px;
  padding: 50px calc(25vw - 200px);
  box-sizing: border-box;
}
</style>
