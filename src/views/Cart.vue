<script> 
import { ref } from 'vue';
import { useEndpointStore } from '../stores/endpoint'
import { useUserStore } from '../stores/user'
import { Van } from '@vicons/carbon'
import { TrashOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'

let user;
let endpoint;

export default{
    data(){
        return{
            color: '#BDBDBD',//colore icona van
            articoli: [],//array contenent gli articoli
            isFetching: true,
            totalPrice: ref(0.0),//prezzo totale degli articoli + spedizione
            shipmentPrice: ref(0.0),//prezzo totale della spedizione per i vari articoli        
        }
    },
    setup(){
        return{
            checkQuantity: (x) => x>0
        };
    },
    components: {
        Icon,
        Van,
        TrashOutline,
    },
    methods:{
        getTotalPrice(){
            this.totalPrice = 0;
            this.shipmentPrice = 0;
            let articles = this.articoli.articles;
            let cart = this.articoli.cart;
            for(let i=0; i<articles.length; i++){
                this.totalPrice += (parseFloat(articles[i].price["$numberDecimal"]) * cart[i].quantity);
                this.shipmentPrice += (parseFloat(articles[i].shipmentPrice["$numberDecimal"]));
            }

        },
        //funzione che ritorna gli articoli inseriti nel carrello dall'utente
        async CartItems() {
            user = useUserStore()
            endpoint = useEndpointStore()

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json' },
                body: JSON.stringify({
                    email: user.email
                })
            };

            const result = await fetch(`${endpoint.endpoint}/cart/`, requestOptions)
            .then(response => response.json())
            .then((cart) => { 
                this.articoli = cart;

                //calcolo prezzo totale
                this.getTotalPrice();

            })

            this.isFetching = false;
        },
        async removeItem(id){

            let email = user.getEmail();
            let idItem = id;
            console.log(idItem+"\n"+email+"\n");
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    id: idItem
                })
            };
 
            const result = await fetch(`${endpoint.endpoint}/cart/`, requestOptions)
            .then(response => {
                response.json();
                if(response.status == 200){
                    //elimino l'articolo dall'array items
                    let index= -1;
                    let found = false;
                    let cart = this.articoli.cart;

                    //ricerca elemento all'interno del carrello
                    for(let i = 0; i<cart.length && !found; i++){
                        if(cart[i].id == idItem){
                            found = true;
                            index = i;
                        }
                    }
                    
                    if(index > -1){
                        //eliminazione elemento
                        //in quanto gli array cart e articles sono paralleli
                        this.articoli.cart.splice(index, 1);
                        this.articoli.articles.splice(index, 1);
                        this.getTotalPrice();//aggiornamento prezzo carrello
                    }   
                }
            })
        },
        async updateItemQuantity(id, quantity){
            let email = user.getEmail();

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    id: id,
                    quantity: quantity
                })
            };
 
            const result = await fetch(`${endpoint.endpoint}/cart/`, requestOptions)
            .then(response => {
                response.json();
                this.getTotalPrice();//aggiornamento prezzo carrello
            })
            
        },
        remove(id){//funzione per la rimozione di un articolo dal carrello  
            this.removeItem(id);
        },
        setQuantity(id, q){//funzione per la modifica della quantità del prodotto nel database
            this.updateItemQuantity(id, q);
        },
        marketRedirect(){
            location.replace("/market");
        },
    },
    mounted(){//al caricamento della pagina eseguo la funzione
        this.CartItems();
    }
}

</script>

<template>
<!--gli articoli del carrello vengono mostrati una volta che viene
effettuato il fetch-->
<div v-if="isFetching"></div>
<div v-else>
    <!--carrello vuoto-->
    <div v-if="Object.keys(articoli.cart).length === 0">
        <n-space vertical justify="center" size="large" align="center" style="min-height: calc(100vh - 64px); row-gap: 33px;">
            <img src="../images/EmptyCart.png" class="cartImage">
            <n-space vertical jsutify="center" align="center" style="row-gap: 12px">
                <span class="t-h3" style="color: #44355B">Sembra che il carrello sia vuoto</span>
                <span class="t-normal">Scopri subito tutti i nostri prodotti nella sezione marketplace!</span>
            </n-space>
            <n-button round size="large" type="primary" block @click="marketRedirect()">Visita il negozio</n-button>
        </n-space>
    </div>

    <!--carrello con all'interno degli articoli-->
    <div v-else>
        <n-space justify="space-evenly">
            <!--div card articoli-->
            <!--per accedere agli attributi dell'articolo viene usato l'index of sul cart usando l'id-->
            <n-space vertical size="large" style="min-height: calc(100vh - 64px); row-gap: 44px; padding-top: 40px; padding-bottom: 96px;">
                <div v-for="articolo in articoli.cart">
                    <n-card style="margin-left: 30px;">
                        <n-space justify="space-between" align="center">
                            <n-space justify="center">
                                <!--nspace image articolo-->
                                <n-space vertical style="margin-right: 62px; width: 180px; height: 180px;">
                                    <!--andrebbe inserito il path dell'immagine dell'articolo-->
                                    <img src="../images/LoadingCart.png" style="max-width: 180px; max-height: 180px;">
                                </n-space>

                                <!--nspace info articolo-->
                                <n-space vertical style="row-gap: 26px;">
                                    <!--nspace titolo, luogo ritiro a mano-->
                                    <n-space vertical style="row-gap: 2px;">
                                        <div class="title">
                                            <!--al posto del semplice span un link per la visualizzazione dell'articolo completa-->
                                            <span class="t-h4">{{articoli.articles[articoli.cart.indexOf(articolo)].title}}</span>
                                        </div>
                                        <div v-if="articoli.articles[articoli.cart.indexOf(articolo)].handDeliverZone">
                                            <span class="t-small-bold" style="color: #BDBDBD">{{articoli.articles[articoli.cart.indexOf(articolo)].handDeliverZone}}</span>
                                        </div>
                                        <div v-else>
                                            <br/><!--carattere newLine per evitare incosistenze di spaziature-->
                                        </div>

                                    </n-space>

                                    <!--nspace prezzo articolo e spedizione-->
                                    <n-space align="baseline" style="column-gap: 20px;">
                                        <span class="t-h3" style="color: #FA4F2E">€ {{parseFloat(articoli.articles[articoli.cart.indexOf(articolo)].price["$numberDecimal"])}}</span>
                                        <n-space v-if="!articoli.articles[articoli.cart.indexOf(articolo)].handDeliver" style="column-gap: 10px;">
                                            <Icon size="20" :color="color">
                                                <Van />
                                            </Icon>
                                            <span class="t-small-bold" style="color: #BDBDBD"> € {{parseFloat(articoli.articles[articoli.cart.indexOf(articolo)].shipmentPrice["$numberDecimal"])}}</span>
                                        </n-space>
                                    </n-space>

                                </n-space>
                            </n-space>

                            <!--nspace quantità e cancella-->
                            <n-space align="center" style="row-gap: 16px; margin-right: 35px;">
                                <n-input-number size="large" style="max-width: 120px;" button-placement="both" :default-value="articolo.quantity" v-model:value="articolo.quantity" :validator="checkQuantity" 
                                @update:value="setQuantity(articolo.id, articolo.quantity)" :max="articoli.articles[articoli.cart.indexOf(articolo)].quantity" 
                                clearable/>
                                <n-button circle type="info" @click="remove(articolo.id)">
                                    <Icon size="20">
                                        <TrashOutline />
                                    </Icon>
                                </n-button>
                            </n-space>
                        </n-space>
                    </n-card>
                </div>
            </n-space>    

            <!--div prezzo totale e checkout-->
            <n-space vertical style="row-gap: 15px; padding-top: 338px;">
                <span class="t-h3" style="color: #44355B">Totale Ordine</span>

                <n-space vertical style="row-gap: 40px;">
                    <!--prezzo totale e spedizione-->
                    <n-space vertical>
                        <span class="t-h2" style="color: #FA4F2E">€ {{totalPrice}}</span>
                        <span class="t-normal-bold" style="color: #BDBDBD">di cui € {{shipmentPrice}} di spedizione</span>
                    </n-space>

                    <n-button round size="large" type="primary" @click="" block>Procedi al checkout</n-button>
                </n-space>
            </n-space>

        </n-space>
    </div>

</div>
</template>

<style scoped>

.cartImage{
    width: 85%;
    height: 85%;
    padding-bottom: 33px;
}
.title{
    max-width: 45ch;
    display: inline-block;
}

</style>