<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Files imports
import theme from '../assets/theme'

//Component imports
import NotFound from '../components/images/NotFound.vue'
import NoImage from '../components/images/NoImage.vue'
import { Icon } from '@vicons/utils'
import { IosArrowBack } from '@vicons/ionicons4'
import { ImageOutline, ChatbubblesOutline } from '@vicons/ionicons5'
import { MapPin } from '@vicons/tabler'
import { Van, User } from '@vicons/carbon'
import { Heart24Filled } from '@vicons/fluent'

async function getProduct(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

  const result = await fetch(`${server.productEndpoint}/id=`+id, options).then(response => response.json());

  return result;
}

export default {
    data() {
        const smallLabel = '#00000060'

        return {
            theme,
            smallLabel,
            id: this.$route.params.id,//id prodotto indicato nell'url
            item: null,//dati relativi al prodotto indicate nell'url
            seller: null,//dati relativi al venditore del prodotto
            tileStyle: { color: theme.common.primaryColor},
            infoStyle: { color: theme.common.primaryColor},
            priceStyle: { lineHeight: '2rem', color: theme.common.infoColor }
        }
    },
    async mounted(){
        const response = await getProduct(this.id)
        this.item = response.article;
        this.seller = response.seller;
    },
    methods: {
        //inserimento articolo nel proprio carrello
        async addCart(){
            const user = useUserStore()
            const server = useServerStore()

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
                body: JSON.stringify({
                    email: user.data.email,
                    id: this.id
                })
            }

            const result = await fetch(`${server.cartEndpoint}/add`, options).then(response => response.json());
            return result;
        },
        //inserimento articolo nella propria wishlist
        async addWishlist(){
            const user = useUserStore()
            const server = useServerStore()

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
                body: JSON.stringify({
                    email: user.data.email,
                    id: this.id
                })
            }

            const result = await fetch(`${server.wishlistEndpoint}/add`, options).then(response => response.json());
            return result;
        },
        //acquisto diretto dell'articolo
        //TODO funzione checkout del cart da implementare
        async buy(){
            const user = useUserStore()
            const server = useServerStore()

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
                body: JSON.stringify({
                    email: user.data.email,
                    id: this.id
                })
            }

            const result = await fetch(`${server.cartEndpoint}/checkout`, options).then(response => response.json());
            console.log(result)
            return result;
        },
        async sendProposal(){
            
        },
        async chat(){

        },
        async goToSeller(){

        }
    },
    components: {
        NotFound,
        NoImage,
        Icon,
        IosArrowBack,
        ImageOutline,
        MapPin,
        Van,
        User,
        Heart24Filled,
        ChatbubblesOutline
    }
}


</script>

<template>
<n-space v-if="item" class="container">
    <!--prodotto trovato-->

    <n-space justify="space-evenly">

        <!--info testuali e immagini-->
        <n-space vertical>
            <!--il redirect a go back dovrebbe prendere il precedente path relativo ad una ricerca-->
            <n-button round size="large" type="primary" @click="$router.go(-1)"><Icon style="padding-right: 10px;"><IosArrowBack/></Icon>Torna alla ricerca</n-button>
            
            <!--titolo e immagini prodotto-->
            <n-space vertical style="padding-top: 20px">
                <n-h3 style="titleStyle; max-width: 650px; word-wrap: break-word;">{{item.title}}</n-h3>
                <n-carousel dot-placement="bottom" dot-type="line" style="max-width: 540px; max-height: 405px">
                    <!--alcune immagini di prova ad eccezione del v-for-->
                    <!--non vengon visualizzate le immagini come nel carrello per un problema al path-->
                    <img class="carousel-img" src="https://www.marcotorella.com/wp-content/uploads/2021/10/Copia-di-come-organizzare-gli-appunti-576x1024.png">
                    <img v-for="image in item.photos" class="carousel-img" :src="image.path" style="background-color: #D9D9D9;">
                </n-carousel>
            </n-space>
        
            <!--descrizione-->
            <n-space vertical size="small" style="padding-top: 40px">
                <n-h4 style="infoStyle">Descrizione</n-h4>
                <n-h6 v-if="item.description">{{item.description}}</n-h6>
                <n-h6 v-else>Nessuna descrizione disponibile</n-h6>
            </n-space>
        </n-space>

        <!--info prezzo, luogo e bottoni-->
        <n-space vertical style="padding-left: 100px; row-gap: 100px;">
            
            <n-space vertical>
                <n-space vertical style="padding-top: 160px; padding-bottom: 20px;">
                    <!--prezzo e info spedizione-->
                    <n-h2 :style="priceStyle">€ {{parseFloat(item.price['$numberDecimal']).toFixed(2)}}</n-h2>
                    <n-h5><Icon><MapPin/></Icon>{{item.location}}</n-h5>
                    <n-h5><Icon><Van/></Icon>Spedizione: € {{parseFloat(item.shipmentPrice['$numberDecimal']).toFixed(2)}}</n-h5>
                    <n-h5 v-if="item.handDeliver"><Icon><User/></Icon> Ritiro a mano disponibile</n-h5>
                </n-space>

                <!--bottoni carrello, wishlist, compra e invia proposta-->
                <n-space vertical style="row-gap: 10px;">
                    <n-space style="column-gap: 20px;">
                        <n-button round type="primary" size="large" @click="addCart">Aggiungi al carrello</n-button>
                        <n-button round type="primary" size="large" @click="addWishlist"><Icon size="20" :color="theme.common.foreground"><Heart24Filled/></Icon></n-button>
                    </n-space>
                    <n-button round type="info" size="large" @click="buy">Compra subito</n-button>
                    <n-button round ghost type="primary" size="large" @click="sendProposal">Invia una proposta</n-button>
                </n-space>
            </n-space>

            <!--info venditore-->
            <n-space vertical>
                <n-h4 style="infoStyle">Info Venditore</n-h4>
                <n-h6>{{seller.username}}</n-h6>
                <n-h6>RECENSIONE ...</n-h6>
                <n-space>
                    <n-button round type="primary" size="large" @click="chat"><Icon><ChatbubblesOutline/></Icon>Avvia una chat</n-button>
                    <n-button round type="info" size="large" @click="goToSeller">Visita il profilo</n-button>
                </n-space>
            </n-space>

        </n-space>
    
    </n-space>

</n-space>

<n-space v-else vertical justify="center" align="center" size="large" style="min-height: calc(100vh - 64px);">
    <!--prodotto non trovato-->
    <NotFound size="400"/>
    <n-h1>Uh? Sembra che il prodotto non esista</n-h1>
    <n-p>Visita il negozio per riprendere la tua esperienza!</n-p>
    <n-button round size="large" type="primary" @click="this.$router.push('/market')">Visita il negozio</n-button>
</n-space>


</template>

<style scoped>

.container {
  min-height: calc(100vh - 64px);
  row-gap: 33px;
  padding: 50px calc(25vw - 200px);
  box-sizing: border-box;
}
.carousel-img {
  width: 540px;
  height: 405px;
  object-fit: cover;
}

</style>