<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Files imports 
import theme from '../assets/theme'

// Components imports
import ReviewCard from '../components/ReviewCard.vue'
import ProductCard from '../components/ProductCard.vue'
import { Icon } from '@vicons/utils'
import { Heart24Filled } from '@vicons/fluent'
import { ref } from 'vue'

//ricerca recensioni del venditore
async function getReviews(seller_id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

    const result = await fetch(`${server.reviewEndpoint}/seller/id=`+seller_id, options).then(response => response.json());
    return result;
}

//ricerca inforamzioni sul venditore
async function getSellerInfo(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

    const result = await fetch(`${server.productEndpoint}/seller/id=`+id, options).then(response => response.json());

    return result;
}

//ricerca prodotti del venditore che sono in vendita
async function getArticles(seller_username){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

    const result = await fetch(`${server.productEndpoint}/username=`+seller_username, options).then(response => response.json());
    return result;
}

//ricerca utente autore della review
async function getAuthor(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

  const result = await fetch(`${server.productEndpoint}/buyer/id=`+id, options).then(response => response.json());

  return result;
}

export default{
    data() {
        return {
            theme,
            reviews: ref([]),
            items: ref([]),
            seller_id: this.$route.query.id,//id del venditore
            seller: ref(""),//username del venditore
        } 
    },
    components: {
        ReviewCard,
        ProductCard,
        Icon,
        Heart24Filled,
    },
    async mounted() {
        //richiesta recensioni seller da api
        const reviews = await getReviews(this.seller_id);
        this.reviews = reviews.reviews;
        
        //ricerca username autore ed aggiunta dell'attributo author
        //nel json object della corrispondente review
        for(let i=0; i<this.reviews.length; i++) {
            const username = await getAuthor(this.reviews[i].authorId);
            this.reviews[i]["author"] = username.user.username;
        }

        //richiesta username seller da api
        const seller = await getSellerInfo(this.seller_id);
        this.seller = seller.user.username;

        //richiesta articoli in vendita del seller da api
        const articles = await getArticles(this.seller);
        this.items = articles.items;
  
    },
    methods: {
        //inserimento articolo nella propria wishlist
        async addWishlist(id){
            const user = useUserStore()
            const server = useServerStore()

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
                body: JSON.stringify({
                    email: user.data.email,
                    id: id
                })
            }

            const result = await fetch(`${server.wishlistEndpoint}/add`, options).then(response => response.json());
            return result;
        }
    }
}

</script>

<template>
<n-space vertical class="container" :style="{ backgroundColor: theme.common.primaryColor }">
    <n-space align="baseline" >
    <n-h1 :style="{ color: theme.common.foreground }">{{ this.seller }} </n-h1>
    <n-h5 :style="{ color: theme.common.foreground }"> Profilo Venditore </n-h5>
    </n-space>

    <n-card style="border-radius: 25px; width: 1110px;">
    <n-tabs type="line" animated>
        <n-tab-pane name="reviews" tab="Recensioni">
        <n-p>
            <n-space v-if="reviews.length" justify="space-evenly">
                <n-space vertical size="large">
                    <!--il prop username da un warning sul fatto che author sia undefined
                    ma in realtà è corretto-->
                    <ReviewCard v-for="review in reviews"
                            :username="review.author"
                            :title="review.title"
                            :review="review.description"
                            :rating="review.rating"
                            style="width: calc(20vw + 400px);"
                    ><!--prop :photo rimosso, manca gestione caricamento foto server-->
                    </ReviewCard>
                </n-space>
            </n-space>
            <n-space v-else justify="space-evenly" align="center">
                <n-h4>Non sono presenti recensioni</n-h4>
            </n-space>
        </n-p>
        </n-tab-pane>
        
        <n-tab-pane name="articles" tab="Annunci">
            <n-p>
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
                            style="width: calc(20vw + 400px);"
                        ><!--non è stato inserito :photo perchè manca la ricerca delle immagini-->
                            <n-space size="large" align="center" style="felx-wrap: nowrap:">
                                <n-button round type="primary" style="width: 40px; height: 40px; padding: 0" @click="addWishlist(item._id)">
                                    <Icon size="20" :color="theme.common.foreground"><Heart24Filled></Heart24Filled></Icon>
                                </n-button>
                            </n-space>    
                        </ProductCard>
                    </n-space>
                </n-space>
                <n-space v-else justify="space-evenly" align="center">
                <n-h4>Non sono presenti annunci pubblicati</n-h4>
            </n-space>
            </n-p>
        </n-tab-pane>
    </n-tabs>
    </n-card>
</n-space>

</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  padding: 50px calc(25vw - 150px);
  box-sizing: border-box;
  align-self: center;
}

</style>