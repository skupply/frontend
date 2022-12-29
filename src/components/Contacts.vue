<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Components imports
import ContactCard from './ContactCard.vue'

async function getUserInfo(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

  const result = await fetch(`${server.buyerEndpoint}//id=`+id, options).then(response => response.json());

  return result;
}

export default {
    data() {
        return {
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
            const username = await getUserInfo(this.chats[i].user1.id);
           
            //se lo username è diverso da quello dell'utente attuale,
            //vuol dire che ho trovato lo username dell'altro utente
            if(username.user.username != this.username){
                this.chats[i]["user2Username"] = username.user.username;
            } else {
                const username2 = await getUserInfo(this.chats[i].user2.id);
                this.chats[i]["user2Username"] = username2.user.username;
            }
        }

    },
    components: {
        ContactCard,
    },
    methods: {
        callback(id, user){
            this.$emit('openChat', id, user);
        }
    }
}

</script>

<template>
<n-card title="Le tue chat" style="border-radius: 25px; width: 1110px; min-width: 500px; max-width: 500px;">

    <ContactCard v-for="chat in chats"
        :user = "chat.user2Username"
        :id = "chat._id"
        @openChat="callback"
    >
    </ContactCard>
</n-card>
</template>

<style scoped>

</style>