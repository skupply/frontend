<script>
// States imports
import { useUserStore } from '../stores/user'
import { useServerStore } from '../stores/server'

// Components imports
import { Icon } from '@vicons/utils'
import { SendAlt } from '@vicons/carbon'

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
      ready: false,//per quando visualizzare i messaggi una volta ottenuti dal db
      msg: ref(""),//il messaggio che si vuole inviare
      username: ref(""),//lo username dello user attuale
      seller: ref(""),//lo username del venditore con cui ci si sta scrivendo
      messages: ref([]),//lista dei messaggi scambiati
    }
  },
  props: {
    messagesId: { type: Array, required: true },//la lista degli id dei messaggi scambiati
    user2: {type: String, default: ""}
  },
  components: {
    Icon,
    SendAlt
  },
  async mounted(){
    const user = useUserStore()
    this.username = user.data.username;
    this.seller = this.user2;

    //recupero messaggi veri e propri dal db
    for(let i=0; i<this.messagesId.length; i++){
      if(this.messagesId[i] != ""){//mi assicuro che non sia un caso di incosistenza o chat senza messaggi
        let messaggio = await getMessage(this.messagesId[i].id);

        if(messaggio.code=800) {
          //messaggio trovato
          //recupero lo username dell'utente che ha inviato il messaggio
          const username = await getUserInfo(messaggio.message.sender.id);
          messaggio.message["username"] = username.user.username;
          this.messages.push(messaggio.message);

         
        } 
      }
    }
    
    this.ready = true;
  },
  methods: {
    async sendMessage(){
      const user = useUserStore()
      const server = useServerStore()

      //una volta inviato il messaggio al db, devo anche visualizzarlo per "me stesso"
      //non viene usata l'intera struttura del messaggio che viene utilizzata dal db ma, dato che vengono utilizzate
      //solo le informazioni di chi ha inviato il messagio(username) e il testo stesso, verrà creato un oggetto con solo questi
      //2 attributi
      const newMessage = {
        username: this.username,
        text: this.msg,
      }

      this.messages.push(newMessage);

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
        body: JSON.stringify({contact: this.seller, message: this.msg})
      }

      const result = await fetch(`${server.chatEndpoint}/message?username=`+user.data.username, options).then(response => response.json());
    
      //pulizia text area
      this.msg = "";

      return result;
    }
  }
}

/*TODO: 
auto scroll quando si invia un nuovo messaggio
sistemare layout dei messaggi (quelli ricevuti andrebbero a dx)
ritocchi vari su grafica e layout
*/
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010); min-width: 800px; max-width: 800px; min-height: 600px; max-height: 600px;">
    <!--barra superiore-->
    <n-space justify="space-between" style="padding-bottom: 48px;">
      <n-h5>{{ seller }}</n-h5>
      <n-button round size="large" type="info" @click="$emit('closeChat')">Chiudi chat</n-button>
    </n-space>

    <!--zona messaggi-->
    <n-space  v-if="ready" vertical size="large" justify="space-evenly" style="min-height: 100px; min-width: 370px; flex-wrap: nowrap;">
      <!--scrollbar per un numero elevato di messaggi-->
      <n-scrollbar style="max-height: 350px;" trigger="none"><!--se non si vuole vedere la barra, rimuovere trigger-->  
        <n-space vertical style="margin: 0 0 0 25px;"> 
          <!--singolo messaggio-->
          <n-card v-for="message in messages"
            style="min-width: 400px; max-width: 400px;"
                :class="{'div-sender-myself-container': message.username == username, 'div-sender-seller-container': message.username != username}"
            >
              <n-text :class="{'div-sender-myself-text': message.username == username, 'div-sender-seller-text': message.username != username}">
                  {{message.text}}
              </n-text><!--i messaggi inviati da "noi" sono quelli in grigio mentre quelli ricevuti viola-->
          </n-card>

          <n-h5 v-if="messages.length == 0">Inizia a scrivere!</n-h5>
        </n-space>
      </n-scrollbar>
    </n-space>
    <!--input messaggio-->
    <template #action>
      <n-form inline style="align-items: center;">
        <n-form-item path="message" style="min-width: 600px; max-width: 600px;">
          <n-input type="textarea" v-model:value="msg" 
          placeholder="Messaggio" 
          round
          :autosize="{
            minRows: 1,
            maxRows: 7
          }"
          />
        </n-form-item>
        <n-button
          :disabled="this.msg === '' || this.msg === null"
          round
          type="info"
          @click="sendMessage"
        >
          <Icon size="20">
            <SendAlt/>
          </Icon>
        </n-button>
      </n-form>
    </template>
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
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.7rem;
}

.div-sender-seller-text {
    color: white;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.7rem;
}

</style>