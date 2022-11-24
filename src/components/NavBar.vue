<script>

import Wordmark from './icons/Wordmark.vue'
import { Box16Regular } from '@vicons/fluent'
import { User } from '@vicons/carbon'
import { BagHandleOutline, ChatbubblesOutline, HeartOutline, CartOutline, LogOutOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'
import { useUserStore } from '../stores/user'

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
    }
  },
  methods:{
    logout(){
      let user = useUserStore();
      user.reset();
      location.replace("/");
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
    LogOutOutline,
    User
  },
  setup () {
    const userStore = useUserStore();
    const test = () => {
      console.log(userStore.token);
    }
    return {
      test,
      userStore,
      Wordmark
    }
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-space justify="space-evenly" class="background" style="height: 64px; align-items: center;">
        <!--sezione link-->
        <router-link to="/">
          <Wordmark width="100px" height="50px" />
        </router-link>
      
        <n-space justify="space-between" size="large">

          <router-link to="/market">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <BagHandleOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Negozio</span>
            </n-space>
          </router-link>
          <router-link to="/sell">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <Box16Regular />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Vendi</span>
            </n-space>
          </router-link>
          <router-link to="/chat">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <ChatbubblesOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Messaggi</span>
            </n-space>
          </router-link>
          <router-link to="/wishlish">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <HeartOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Wishlist</span>
            </n-space>
          </router-link>
          <router-link to="/cart">
            <n-space align="center" size="small">
              <Icon size="30" :color="color">
                <CartOutline />
              </Icon>
              <span class="t-medium" :style="`color: ${color};`">Carrello</span>
            </n-space>
          </router-link>
        </n-space>
      
      <!--se l'utente è già loggato ovvero, è presente una sessione, sarà presente il link al profilo
      altrimenti un bottone per accedere-->  
      <div v-if="userStore.token">
        <router-link to="/profile">
          <n-space align="center" size="small">
            <Icon size="30" color="#1D1D1D">
              <User />
            </Icon><span class="t-medium" style="color:#1D1D1D">Il tuo profilo</span>
            <n-button type="quaternary" @click="logout">
              <Icon size="30" color="#1D1D1D">
                <LogOutOutline />
              </Icon>
            </n-button>
          </n-space>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/login">
          <n-button round ghost size="large" type="primary"><span class="t-normal-bold">Accedi</span></n-button>
        </router-link>
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