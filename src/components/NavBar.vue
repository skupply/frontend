<script>

import Wordmark from './icons/Wordmark.vue'
import { Box16Regular } from '@vicons/fluent'
import { BagHandleOutline, ChatbubblesOutline, HeartOutline, CartOutline } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'

export default {

  components: {
    Wordmark,
    Icon,
    Box16Regular,
    BagHandleOutline,
    ChatbubblesOutline,
    HeartOutline,
    CartOutline
  },
  setup () {
    return {
      Wordmark
    }
  }
}
</script>

<template>

  <n-space justify="space-evenly" class="background" style="padding-top:21px">
      <!--sezione link-->
      <Wordmark witdh="150px" height="50px" color="#1D1D1D"/>
    
      <n-space justify="space-between" size="large">
        <a href="">
        <Icon size="30" color="#1D1D1D">
            <BagHandleOutline />
        </Icon><span class="t-medium" style="color:#1D1D1D">Negozio</span></a>

        <a href="">
        <Icon size="30" color="#1D1D1D">
            <Box16Regular />
        </Icon><span class="t-medium" style="color:#1D1D1D">Vendi</span></a>

        <a href="">
        <Icon size="30" color="#1D1D1D">
            <ChatbubblesOutline />
        </Icon><span class="t-medium" style="color:#1D1D1D">Messaggi</span></a>

        <a href="">
        <Icon size="30" color="#1D1D1D">
            <HeartOutline />
        </Icon><span class="t-medium" style="color:#1D1D1D">Wishlist</span></a>

        <a href="">
        <Icon size="30" color="#1D1D1D">
            <CartOutline />
        </Icon><span class="t-medium" style="color:#1D1D1D">Carrello</span></a>
    </n-space>
    <n-button round ghost size="large" type="primary"><span class="t-normal-bold">Accedi</span></n-button>
  </n-space>

</template>

<style scoped>

.background{
  background-color: #FEFEFE;
}

a:link {
  text-decoration: none;
}

</style>