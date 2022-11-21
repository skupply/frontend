<script> 
import { useEndpointStore } from '../stores/endpoint'
import { useUserStore } from '../stores/user'

let user;
let endpoint;
let articoli = ref([]);//gli articoli presenti nel carrello

async function CartItems() {
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
        articoli = JSON.stringify(cart);
        document.getElementById("cart").innerHTML = articoli;
        return {items: JSON.stringify(cart)}; 
    }); 

    return result;
}
    
export default{
    methods:{
        handleCartItems(){
            CartItems();
        }
    },
    beforeMount(){
        this.handleCartItems();
    }
}

</script>

<template>
Articoli carrello: <br/>
<span id="cart"></span>
</template>

<style scoped>
</style>