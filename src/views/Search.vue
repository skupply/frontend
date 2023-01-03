<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Packages imports
import { ref } from 'vue'
import { NIcon, useMessage } from 'naive-ui'

// Files imports 
import theme from '../assets/theme'

// Components imports
import ProductCard from '../components/ProductCard.vue'
import { Icon } from '@vicons/utils'
import { Heart24Filled, Info28Regular, SidebarSearchRtl20Regular } from '@vicons/fluent'
import { SearchOutline } from '@vicons/ionicons5'

let message = null

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

export default{
    data(){
        return {
            options: [],
            items: ref([]),
            orderByoptions: [{label: "Prezzo crescente", value: "asc_price"}, {label: "Prezzo decrescente", value: "desc_price"}],
            key: ref(""),
            category: ref(""),
            location: ref(""),
            minPrice: ref("0"),
            maxPrice: ref("0"),
            isShipment: ref(""),
            rating: ref(""),
            orderBy: ref(""),
            theme,
            decorationStyle: { backgroundColor: theme.common.primaryColor },
            priceStyle: { lineHeight: '2rem', color: theme.common.infoColor },
            hStyle: { lineHeight: '2rem', color: theme.common.primaryColor }
        }
    }, 
    components: {
        ProductCard,
        Icon,
        Heart24Filled,
        Info28Regular,
        SidebarSearchRtl20Regular,
        SearchOutline
    },
    async mounted(){
        this.getQueryParams();
        const response = await this.getItems();
        this.items = response.articles;
        const result = await getCategories();

        this.options.push({ label: 'Tutte le categorie', value: '' });
        result.categories.forEach(element => {
        this.options.push({label: element.title, value: element.title});
        });
    },
    setup() {
        message = useMessage()

        return {
            searchForm,
            searchModel,
            searchRules,
            ratings: [
                {
                    value: 5,
                    label: "5 stelle"
                },
                {
                    value: 4,
                    label: "4 stelle o più"
                },
                {
                    value: 3,
                    label: "3 stelle o più"
                },
                {
                    value: 2,
                    label: "2 stelle o più"
                },
                {
                    value: 1,
                    label: "1 stella o più"
                },
                {
                    value: 0,
                    label: "qualsiasi stella"
                },
            ]
        }
    },
    methods: {
        validateSearch() {
            searchForm.value?.validate(error => {
                if (error) { message.error('Campi non validi'); return true }
                const query = this.searchModel.query
                const category = this.searchModel.category
                const location = this.searchModel.location
    
                this.key = query;
                this.category = category;
                this.location = location;

                this.newSearch()
            }).catch(() => {})
        },
        info() {
            message.create("La ricerca per recensione si basa sulla media delle recensioni del venditore e non sul singolo prodotto.", {
                type: "success",
                icon: () => h(NIcon, null, { default: () => h(SidebarSearchRtl20Regular) }),//visualizzazione icona personalizzata
                closable: true,
                duration: 5e3,//durata di 5 secondi
                showIcon: true,
                keepAliveOnHover: true,//con il cursore sopra, il messaggio non viene chiuso
            });
        },
        //vengono prelevati i parametri di ricerca dall'url al caricamento della pagina
        getQueryParams(){
            this.key = this.$route.query.key;
            this.category = this.$route.query.category;
            this.location = this.$route.query.location;  
            this.minPrice = this.$route.query.min_price;  
            this.maxPrice = this.$route.query.max_price;  
            this.isShipment = (this.$route.query.shipment == "true") ? true : false; 
            this.rating = this.$route.query.rating;  
            this.orderBy = this.$route.query.orderBy;  

        },
        //ricerca articoli in base ai parametri passati alla url
        async getItems(){
            const user = useUserStore()
            const server = useServerStore()

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
            };

            let url;//costruzione url da inviare alla api
            url = this.getUrl();
            this.$router.push(url);
            const result = await fetch(`${server.searchEndpoint}`+url, requestOptions).then(response => response.json())
            return result;
        },
        //effettuazione di una nuova ricerca in seguito alla selezione di un input
        async newSearch(){
            const response = await this.getItems();
            this.items = response.articles;
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
                url+="min_price="+this.minPrice+"&";

            if(this.maxPrice)
                url+="max_price="+this.maxPrice+"&";

            if(this.isShipment)
                url+="shipment="+this.isShipment+"&";

            if(this.rating)
                url+="rating="+this.rating+"&";

            if(this.orderBy)
                url+="orderBy="+this.orderBy+"&";


            //rimozione ampresand finale
            if(url.charAt(url.length-1).localeCompare('&') == 0){
                url = url.substring(0, url.length-1 );
            }
    
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
        },
        topFunction() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }
}

//FIXME: tutti i campi vengono pre compilati se sono presenti già dei valori ma non
// per il campo rating che rimane come non compilato (soluzione momentanea, disattivare il radio button corrispondente
//) e la barra di ricerca
</script>

<template>
<!--barra di ricerca-->
<n-space class="decoration" justify="center" size="large" align="center" :style="decorationStyle">
    <n-form inline ref="searchModel" :model="this.searchModel" :rules="searchRules">
        <n-form-item path="query">
            <n-input v-model:value="this.searchModel.query" round placeholder="Cosa cerchi?"/>
        </n-form-item>
        <n-form-item path="category">
            <n-select v-model:value="this.searchModel.category" :options="options" :style="{width: '250px'}"/>
        </n-form-item>
        <n-form-item path="location">
            <n-input v-model:value="this.searchModel.location" round placeholder="Dove?"/>
        </n-form-item>
    </n-form>
    <n-button round size="large" type="info" @click="validateSearch">
        <n-space align="center">
            <Icon size="20" :color="theme.common.foreground"><SearchOutline /></Icon>
            Cerca
        </n-space>
    </n-button>
</n-space>

<n-space class="container" justify="space-evenly" size="large">
    <!--barra filtri-->
    <n-space vertical size="small">

        <!--tipo di ordinamento-->
        <n-space vertical size="small">
            <n-h5 :style="hStyle">Ordina per</n-h5>
            <n-form-item path="orderBy">
            <n-select v-model:value="this.orderBy" :options="orderByoptions" :style="{width: '200px'}"
            @update:value="newSearch()"/>
            </n-form-item>
        </n-space>

        <!--spedizione-->
        <n-space vertical size="small">
            <n-h5 :style="hStyle">Filtri</n-h5>
            <n-form-item path="isShipment" label="Spedizione" :style="hStyle">
                <n-checkbox v-model:checked="this.isShipment" @update:checked="newSearch()">Disponibile</n-checkbox>
            </n-form-item>
        </n-space>

        <!--prezzo-->
        <n-space vertical size="small">
            <n-h5 :style="hStyle">Prezzo</n-h5>
            <n-form-item path="max_price" label="Massimo" :style="hStyle">
                <n-input v-model:value="this.maxPrice" round placeholder="€ 0.00" :style="{width: '100px'}"
                @blur="newSearch()"/>
            </n-form-item>
            
            <n-form-item path="min_price" label="Minimo" :style="hStyle">
                <n-input v-model:value="this.minPrice" round placeholder="€ 0.00" :style="{width: '100px'}"
                @blur="newSearch()"/>
            </n-form-item>
        </n-space>

        <!--valutazione-->
        <n-space vertical size="small">
            <n-h5 :style="hStyle">Valutazione<Icon size="20" @click="info"><Info28Regular></Info28Regular></Icon></n-h5>
            <n-radio-group v-model:value="this.rating" name="rating">
                <n-space vertical>
                    <n-radio
                    v-for="rating in ratings"
                    :key="rating.value"
                    :value=rating.value
                    :label="rating.label"
                    :disabled="rating.value == this.rating"
                    :default-checked="rating.value == this.rating"
                    @change="newSearch"/>
                </n-space>
            </n-radio-group>
        </n-space>

    </n-space>

    <n-space v-if="items.length">
        <!--elenco annunci-->
        <n-space justify="center">
            <n-space vertical size="large">
            <ProductCard v-for="item in items"
            :id="item._id"
            :title="item.title"
            :quantity="item.quantity"
            :selected="item.selected"
            :price="parseFloat(item.price['$numberDecimal'])"
            :shipping="parseFloat(item.shipmentCost['$numberDecimal'])"
            :location="(item.city ? item.city : '')"
            :image="item.photos[0]"
            style="width: calc(20vw + 400px);"
        ><!--:image="item.photos[0]"  rimosso prop image -->
            <n-space size="large" align="center" style="felx-wrap: nowrap:">
                <n-button round type="primary" style="width: 40px; height: 40px; padding: 0" @click="addWishlist(item._id)">
                    <Icon size="20" :color="theme.common.foreground"><Heart24Filled></Heart24Filled></Icon>
                </n-button>
            </n-space>
        </ProductCard>
            </n-space>
        </n-space>
    </n-space>

    <n-space v-else vertical justify="center" size="large">
        <!--prodotti non trovati-->
        <n-h3>Nessun prodotto trovato</n-h3>
        <NoImage size="600"/>
    </n-space>

</n-space>

<n-space class="decoration" justify="center" size="large" align="center" :style="decorationStyle">
<n-button round type="info" size="large" @click="topFunction()">Torna ad inizio pagina</n-button>
</n-space>   

</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  row-gap: 33px;
  padding: 50px calc(25vw - 200px);
  box-sizing: border-box;
}

.decoration {
  flex-wrap: nowrap;
  background-repeat: no-repeat;
  background-size: 100% 120%;
  background-image: url("../assets/images/Decoration2.svg");
  min-height: 160px;
}

</style>