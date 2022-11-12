<script>

import Wordmark from './icons/Wordmark.vue'
import { Box16Regular } from '@vicons/fluent'
import { User } from '@vicons/carbon'
import { BagHandleOutline, ChatbubblesOutline, HeartOutline, CartOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'

export default {
  data(){
    return {
      color: "#1D1D1D",
      theme:{
        Button: {
            paddingRoundLarge: "10px 40px",
            borderPrimary: "2px solid"
          },
          Space: {
            gapLarge: "8px 50px"
          }
      },
      isLogged : false /*controllare se è presenta una sessione*/
    }
  },
  components: {
    Wordmark,
    Icon,
    Box16Regular,
    BagHandleOutline,
    ChatbubblesOutline,
    HeartOutline,
    CartOutline,
    User
  },
  setup () {
    return {
      Wordmark
    }
  },
  methods: {
    handleAccediButton : function(event){
      window.open('/Login', "_self");
    }
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-space justify="space-evenly" class="background" style="height: 64px; align-items: center;">
        <!--sezione link-->
        <a href="/">
          <Wordmark width="100px" height="50px" />
        </a>
      
        <n-space justify="space-between" size="large">

          <a href="/market">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <BagHandleOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Negozio</span>
            </n-space>
          </a>
          <a href="/sell">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <Box16Regular />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Vendi</span>
            </n-space>
          </a>
          <a href="/chat">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <ChatbubblesOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Messaggi</span>
            </n-space>
          </a>
          <a href="/wishlish">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <HeartOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Wishlist</span>
            </n-space>
          </a>
          <a href="/cart">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <CartOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Carrello</span>
            </n-space>
          </a>
        </n-space>
      
      <!--se l'utente è già loggato ovvero, è presente una sessione, sarà presente il link al profilo
      altrimenti un bottone per accedere-->  
      <div v-if="isLogged">
        <n-space align="center" size="small">
          <Icon size="30" color="#1D1D1D">
            <User />
          </Icon><span class="t-medium" style="color:#1D1D1D">Il tuo profilo</span>
        </n-space>
      </div>
      <div v-else>
        <n-button round ghost size="large" type="primary" @click="handleAccediButton()"><span class="t-normal-bold">Accedi</span></n-button>
      </div>
      
    </n-space>
  </n-config-provider>
</template>

<style scoped>
.background{
  background-color: #FEFEFE;
}

a:link {
  text-decoration: none;
}
</style>