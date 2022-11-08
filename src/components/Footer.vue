<script>
import Wordmark from './icons/Wordmark.vue'
import { Icon } from '@vicons/utils'
import { LogoFacebook, LogoTwitter, LogoInstagram, LogoYoutube } from '@vicons/ionicons5'

export default {

  components: {
    Icon,
    LogoFacebook,
    LogoTwitter,
    LogoInstagram,
    LogoYoutube
  },
}
</script>

<template>

  <n-space vertical justify="center" class="background">
    <n-space class="links" justify="space-evenly" size="large" style="padding: 20px 0;">
      <!--sezione link-->
      <a href="" class="t-small-bold">FAQ</a>       
      <a href="" class="t-small-bold">Risorse</a>
      <Wordmark width="150px" height="50px" color="#828282" />
      <a href="" class="t-small-bold">Riguardo a noi</a>
      <a href="" class="t-small-bold">Supporto</a>
    </n-space>

    <!--sezione social media-->
    <n-space justify="center" size="large">
      <a href="https://facebook.com" target="_blank">
        <Icon size="30" color="#828282">
          <LogoFacebook />
        </Icon>
      </a>
      <a href="https://twitter.com" target="_blank">
        <Icon size="30" color="#828282">
          <LogoTwitter />
        </Icon>
      </a>
      <a href="https://instagram.com" target="_blank">
        <Icon size="30" color="#828282">
          <LogoInstagram />
        </Icon>
      </a>
      <a href="https://youtube.com" target="_blank">
        <Icon size="30" color="#828282">
          <LogoYoutube />
        </Icon>
      </a>
    </n-space>

    <!-- sezione extra-->
    <n-space justify="center" size="medium" style="padding-top: 40px; padding-bottom: 20px;">
        <span class="t-small-bold" style="color: #828282">© 2022</span>
        <a href="" class="t-small-bold" style="color: #828282">Privacy - Termini</a>
    </n-space>
  </n-space>

</template>

<style scoped>

.background{
  background-color: #282828;
}

.links a {
  width: 100px;
  padding: 5px;
  display: block;
  box-sizing: border-box;
}

a {
  color: #828282;
}

a:link {
  text-decoration: none;
}

</style>