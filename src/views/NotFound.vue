<script>
// Components imports
import NotFound from '../components/images/NotFound.vue'

export default {
  components: {
    NotFound
  }
}
</script>

<template>
  <n-space vertical justify="center" align="center" size="large" style="min-height: calc(100vh - 64px);">
    <NotFound size="400"/>
    <n-h1>Uh? Sembra che la pagina non esista</n-h1>
    <n-p>Il team di Skupply si scusa per il disagio. Visita il negozio per riprendere la tua esperienza!</n-p>
    <n-button round size="large" type="primary" @click="this.$router.push('/market')">Visita il negozio</n-button>
  </n-space>
</template>

<style scoped>
</style>
