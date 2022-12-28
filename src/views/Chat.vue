<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Components imports
import Contacts from '../components/Contacts.vue'
import Messages from '../components/Messages.vue'
import Chat from '../components/images/Chat.vue'

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
            openMessages: false,
            ready: false,
            chats: ref([]),//array contenente tutte le chat effettuate con gli altri utenti
            messages: ref([]),//i messaggi che sono da visualizzare
        }
    },  
    async mounted(){
        //recupero chat allOut ovvero, messaggi inviati
        let chats = await getAllOut();
        this.chats = chats.chats;
        this.ready = true;//per fare in modo che i componenti figli aspettino il fetch 
                            //dei dati 
    },
    components: {
        Contacts,
        Messages,
        Chat
    },
    methods: {
        //funzione che gestisce l'apertura della chat in seguito al 
        //click nel componente figlio Contacts
        callbackOpenChat(id){
            //nel caso la chat è già aperta questa viene chiusa nel caso
            //in cui viene effetttuato un click
            if(this.openMessages) {
                this.openMessages = false;
                return;
            }

            //recupero chat corrispondente
            const chat = this.chats.filter(chat => chat._id == id);
            this.messages = chat[0].messages;//il primo elemento in quanto dal filtro passerà UN SOLO ELEMENTO
            this.openMessages = true;
            
        },
        callbackCloseChat(){
            this.openMessages = false;
        }
    }
}

</script>

<template>
<n-space justify="space-evenly" class="container">
    <Contacts v-if="ready"
        :messages="this.chats"
        @openChat="callbackOpenChat"
    />
    <Messages v-if="ready && openMessages"
        :messagesId="this.messages"
        @closeChat="callbackCloseChat"
    />
    <n-space vertical align="center" v-else>
        <Chat size="600"/>
        <n-h5>Apri una chat per visualizzare i messaggi</n-h5>
    </n-space>

</n-space>
</template>

<style scoped>

.container {
    min-height: calc(100vh - 64px);
    row-gap: 33px;
    padding: 50px 0px;
}

</style>