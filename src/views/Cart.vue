<script> 
import { useEndpointStore } from '../stores/endpoint'
import { useUserStore } from '../stores/user'

let user;
let endpoint;

export default{
    data(){
        return{
            articoli: [],//array contenent gli articoli
            isFetching: true,
        }
    },
    setup(){
        return{
            checkQuantity: (x) => x>0
        };
    },
    methods:{
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
                    }   
                }
            })
        },
        async updateItemQuantity(id, quantity){
            console.log("called setQuantity");
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
        }
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
        <!--per accedere agli attributi dell'articolo viene usato l'index of sul cart usando l'id-->
         <n-space vertical size="large" style="min-height: calc(100vh - 64px); row-gap: 44px; padding-top: 40px;">
            <div v-for="articolo in articoli.cart">
                <n-card>
                    <span>{{articoli.articles[articoli.cart.indexOf(articolo)].title}}</span>
                    <n-button round type="info" @click="remove(articolo.id)">Elimina</n-button>
                    <n-input-number button-placement="both" :default-value="articolo.quantity" v-model:value="articolo.quantity" :validator="checkQuantity" 
                    @update:value="setQuantity(articolo.id, articolo.quantity)" :max="articoli.articles[articoli.cart.indexOf(articolo)].quantity" 
                    clearable/>
                </n-card>
            </div>
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

</style>