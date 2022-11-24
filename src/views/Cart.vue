<script> 
import { useEndpointStore } from '../stores/endpoint'
import { useUserStore } from '../stores/user'

let user;
let endpoint;

export default{
    data(){
        return{
            articoli: []//gli articoli presenti nel carrello
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
                this.articoli = cart;
                return cart; 
            })

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
                        this.articoli.cart.splice(index, 1);
                    }   
                }
            })
        },
        remove(id){//funzione per la rimozione di un articolo dal carrello  
            this.removeItem(id);
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
<p v-if="!articoli">Loading..</p>
<pre v-else>
<li v-for="articolo in articoli.cart">id item: {{articolo.id}} pz: {{articolo.quantity}}<button type="secondary" @click="remove(articolo.id)">Elimina</button>
</li>
</pre>

</template>

<style scoped>
</style>