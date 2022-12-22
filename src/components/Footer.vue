<script>
// Components imports
import FooterLink from './FooterLink.vue'
import Skupply from './icons/Skupply.vue'
import { LogoFacebook, LogoInstagram, LogoTwitter, LogoYoutube } from '@vicons/ionicons5'

const foreground = '#828282'
const background = '#282828'

export default {
  data() {
    return {
      foreground: foreground,
      footerStyle: {
        width: '100vw',
        height: '280px',
        paddingTop: '20px',
        position: 'absolute',
        boxSizing: 'border-box',
        backgroundColor: background
      },
      linkStyle: {
        width: '100px',
        fontSize: '1rem',
        fontWeight: '500',
        textAlign: 'center',
        color: foreground
      }
    }
  },
  components: {
    FooterLink,
    LogoFacebook,
    LogoInstagram,
    LogoTwitter,
    LogoYoutube,
    Skupply
  }
}
</script>

<template>
  <n-space vertical justify="space-evenly" :style="footerStyle">
    <n-space justify="space-evenly" size="large" style="padding: 0 calc(20vw - 150px); flex-wrap: nowrap;">
      <router-link to="/help/#faq" class="link">
        <n-p :style="linkStyle">FAQ</n-p>
      </router-link>       
      <router-link to="/help/#resources" class="link">
        <n-p :style="linkStyle">Risorse</n-p>
      </router-link>
      <router-link to="/">
        <Skupply size="150" :color="foreground"/>
      </router-link>
      <router-link to="/help/#about" class="link">
        <n-p :style="linkStyle">Chi Siamo</n-p>
      </router-link>
      <router-link to="/help/#support" class="link">
        <n-p :style="linkStyle">Supporto</n-p>
      </router-link>
    </n-space>

    <n-space justify="center" size="large">
      <FooterLink link="https://facebook.com" :color="foreground"><LogoFacebook/></FooterLink>
      <FooterLink link="https://twitter.com" :color="foreground"><LogoTwitter/></FooterLink>
      <FooterLink link="https://instagram.com" :color="foreground"><LogoInstagram/></FooterLink>
      <FooterLink link="https://youtube.com" :color="foreground"><LogoYoutube/></FooterLink>
    </n-space>

    <n-space justify="center" size="medium">
      <n-p :style="{ color: foreground, fontSize: '1rem' }">© 2022</n-p>
      <router-link to="/terms" class="link"><n-p :style="{ color: foreground, fontSize: '1rem' }">Privacy - Termini</n-p></router-link>
    </n-space>
  </n-space>
</template>

<style scoped>
.link { text-decoration: none; }
</style>
