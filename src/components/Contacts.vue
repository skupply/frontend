<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Components imports
import ContactCard from './ContactCard.vue'

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

export default {
    data() {
        return {
            hover: false,
            username: ref(""),
            chats: ref([]),
        }
    },
    props: {
        messages: ref([]),//array contenente tutte le chat effettuate con gli altri utenti
    },
    async mounted() {
        const user = useUserStore()
        this.username = user.data.username;
        this.chats = this.messages;
      
        //recupero username dell'utente con cui si ha una chat
        for(let i=0; i<this.chats.length; i++){
            const username = await getSellerInfo(this.chats[i].user1.id);

            //se lo username è diverso da quello dell'utente attuale,
            //vuol dire che ho trovato lo username dell'altro utente
            if(username.user.username != this.username){
                this.chats[i]["user2Username"] = username.user.username;
            } else {
                const username2 = await getSellerInfo(this.chats[i].user2.id);
                this.chats[i]["username2"] = username2.user.username;
            }

        }
    },
    components: {
        ContactCard,
    }
}

</script>

<template>
<n-card title="Le tue chat" style="border-radius: 25px; width: 1110px; min-width: 500px; max-width: 500px;">

    <ContactCard v-for="chat in chats"
        :user = "chat.user2Username"
        @mouseenter = "hover = true"
        @mouseleave = "hover = false"
        @click="$emit('openChat', chat._id)"
        :class="{'div-hover': hover}"
    >
    </ContactCard>
</n-card>
</template>

<style scoped>

.div-hover {
    background-color: #FA4F2EFF;
}

</style>