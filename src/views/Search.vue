<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Packages imports
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

// Files imports 
import theme from '../assets/theme'

// Components imports
import ProductCard from '../components/ProductCard.vue'
import { Icon } from '@vicons/utils'
import { Heart24Filled } from '@vicons/fluent'

let searchModel = ref({ minPrice: '', maxPrice: '', isShipment: '', 
                        rating: '', orderBy: ''});

export default{
    data(){
        return {
            items: [],
            orderByoptions: [{label: "Prezzo crescente", value: "asc_price"}, {label: "Prezzo decrescente", value: "desc_price"},
            {label: "Dal più recente", value: "date"}],
            key: "",
            category: "",
            location: "",
            minPrice: "",
            maxPrice: "",
            isShipment: "",
            rating: "",
            orderBy: "",
            theme,
            priceStyle: { lineHeight: '2rem', color: theme.common.infoColor },
            hStyle: { lineHeight: '2rem', color: theme.common.primaryColor }
        }
    }, 
    components: {
        ProductCard,
        Icon,
        Heart24Filled
    },
    async mounted(){
        const response = await this.getItems();
        this.items = response.articles;
    },
    setup() {
        return {
            searchModel
        }
    },
    methods: {
        //ricerca articoli in base ai parametri passati alla url
        async getItems(){
            const user = useUserStore()
            const server = useServerStore()

            this.key = this.$route.query.key;
            this.category = this.$route.query.category;
            this.location = this.$route.query.location;  
            this.minPrice = this.$route.query.minPrice;  
            this.maxPrice = this.$route.query.maxPrice;  
            this.isShipment = this.$route.query.isShipment;  
            this.rating = this.$route.query.rating;  
            this.orderBy = this.$route.query.orderBy;  

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
            };

            let url;//costruzione url da inviare alla api
            url = this.getUrl();

            const result = await fetch(`${server.searchEndpoint}`+url, requestOptions).then(response => response.json())

            // Add server path to images
            result.articles.forEach(item => {
                item.photos.forEach(photo => {
                photo.path = server.productsMedia + '/images/' + photo.path
                })
            })

            return result;
        },
        //creazione della url da utilizzare per la api di ricerca
        getUrl(){
            let url = "?";

            if(this.key)
                url+="key="+this.key+"&";
            
            if(this.category)
                url+="category="+this.category+"&";

            if(this.location)
                url+="location="+this.location+"&";

            if(this.minPrice)
                url+="minPrice="+this.minPrice+"&";

            if(this.maxPrice)
                url+="maxPrice="+this.maxPrice+"&";

            if(this.isShipment)
                    url+="isShipment="+this.isShipment+"&";

            if(this.rating)
            url+="rating="+this.rating+"&";

            if(this.orderBy)
                url+="orderBy="+this.orderBy+"&";

            return url;
        },
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
    },
    computed: {
        /**
         * da prendere i valori inseriti nel form dei filtri
         * e eseguire una ricerca nuova
         */
    }
}

//TODO
/**
 * filtri --
 * prezzo
 * recensione
 * spedizione
 * 
 * --- funzione in computed che al variare di un valore
 * dei filtri aggiorni la pagina degli articoli
 */




</script>

<template>
    <n-space justify="space-evenly" class="container">
    
        <!--barra filtri-->
        <n-space vertical size="large">
            <n-h5 :style="hStyle">Ordina per</n-h5>
            <n-form-item path="orderBy">
              <n-select v-model:value="searchModel.orderBy" :options="orderByoptions"/>
            </n-form-item>
        </n-space>

        <!--elenco annunci-->
        <n-space justify="center" v-if="items.length">
            <n-space vertical size="large">
            <ProductCard v-for="item in items"
            :id="item._id"
            :title="item.title"
            :quantity="item.quantity"
            :selected="item.selected"
            :price="parseFloat(item.price['$numberDecimal'])"
            :shipping="parseFloat(item.shipmentPrice['$numberDecimal'])"
            :location="(item.handDeliverZone ? item.handDeliverZone : '')"
            :image="item.photos[0].path"
            style="width: calc(20vw + 400px);"
        >
            <n-space size="large" align="center" style="felx-wrap: nowrap:">
                <n-button round type="primary" style="width: 40px; height: 40px; padding: 0" @click="addWishlist(item._id)">
                    <Icon size="20" :color="theme.common.foreground"><Heart24Filled></Heart24Filled></Icon>
                </n-button>
            </n-space>
        </ProductCard>
            </n-space>
        </n-space>

        <n-space v-else vertical justify="center" align="center" size="large" style="min-height: calc(100vh - 64px);">
            <!--prodotti non trovati-->
            <NotFound size="400"/>
            <n-h1>Uh? Sembra che non siano stati trovati prodotti</n-h1>
            <n-p>Visita il negozio per riprendere la tua esperienza!</n-p>
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