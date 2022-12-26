<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Files imports 
import theme from '../assets/theme'

// Components imports
import ContactCard from './ContactCard.vue'


async function getAllOut(){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }
   
    const result = await fetch(`${server.chatEndpoint}?username=`+user.data.username, options).then(response => response.json());
    return result;
}

export default {
    data() {
        return {
            username: ref(""),
            chats: ref([]),//array contenente tutte le chat effettuate con gli altri utenti
        }
    },
    async mounted() {
        const user = useUserStore()
        this.username = user.data.username;

        //recupero chat allOut ovvero, messaggi inviati
        let chats = await getAllOut();
        this.chats = chats.chats;

        //TODO: recuperare username dall'id per il componente ContactCard

    },
    components: {
        ContactCard,
    }
}

</script>

<template>
 <n-card title="Le tue chat" style="border-radius: 25px; width: 1110px; min-width: 500px; max-width: 500px;">
   
    <ContactCard v-for="chat in chats"
        :user1 = "chat.user1.id"
        :user2 = "chat.user2.id"
    >
    </ContactCard>
 
 </n-card>
</template>

<style scoped>
</style>