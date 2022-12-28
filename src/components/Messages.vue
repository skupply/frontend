<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

async function getUserInfo(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

  const result = await fetch(`${server.buyerEndpoint}/id=`+id, options).then(response => response.json());

  return result;
}

async function getMessage(id){
    const user = useUserStore()
    const server = useServerStore()

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token }
    }

  const result = await fetch(`${server.chatEndpoint}/messageId?id=`+id, options).then(response => response.json());

  return result;
}

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      smallLabel,
      username: ref(""),//lo username dello user attuale
      messages: ref([]),//lista dei messaggi scambiati
    }
  },
  props: {
    messagesId: { type: Array, required: true },//la lista degli id dei messaggi scambiati
  },
  async mounted(){
    const user = useUserStore()
    this.username = user.data.username;

    //recupero messaggi veri e propri dal db
    for(let i=0; i<this.messagesId.length; i++){
        let messaggio = await getMessage(this.messagesId[i].id);
        if(messaggio.code=800) {
            //recupero lo username dell'utente che ha inviato il messaggio
            const username = await getUserInfo(messaggio.message.sender.id);
            messaggio.message["username"] = username.user.username;
            this.messages.push(messaggio.message);
        }
    };
    console.log(this.messages);
  }
}

/*TODO: inivio messaggio
        layout style da fare e sistemare
*/
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010); min-width: 800px; max-width: 800px;">
    <n-button round type="info" @click="$emit('closeChat')">Chiudi chat</n-button>
    <n-space size="large" justify="space-between" align="center" style="min-height: 100px; min-width: 370px; flex-wrap: nowrap;">
      <n-space style="flex-wrap: nowrap;">
        <n-space vertical justify="space-between" style="margin: 0 0 0 25px;">
          <n-space vertical>
            <n-card v-for="message in messages"
                :class="{'div-sender-myself-container': message.username == username, 'div-sender-seller-container': message.username == username}"
            >
                <n-text :class="{'div-sender-myself-text': message.username == username, 'div-sender-seller-text': message.username == username}">
                    {{message.text}}
                </n-text>
            </n-card>
          </n-space>
        </n-space>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>

.div-sender-myself-container {
    background-color: #BDBDBD;
}

.div-sender-seller-container {
    background-color: #44355BFF;
}

.div-sender-myself-text {
    color: black;
}

.div-sender-seller-text {
    color: white;
}

</style>