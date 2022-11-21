<script> 
import { useEndpointStore } from '../stores/endpoint'
import { useUserStore } from '../stores/user'

let user;
let endpoint;
    
export default{
    data(){
        return{
            articoli: null//gli articoli presenti nel carrello
        }
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
                this.articoli = JSON.stringify(cart);
                return {items: JSON.stringify(cart)}; 
            }); 

        },
        logout(){//funzione di prova 
            user.reset();
            location.reload();
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
Articoli carrello: <br/>
<p v-if="!articoli">Loading..</p>
<pre v-else>{{articoli}}</pre>

<button type="primary" @click="logout">Logout</button>

</template>

<style scoped>
</style>