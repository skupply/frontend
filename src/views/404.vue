<script scoped>
export default {
  data(){
    return {
      theme:{
        Button: {
            paddingRoundLarge: "25px 120px",
            borderPrimary: "2px solid"
          }
      }
    }
  }
}
</script>

<template>

<n-config-provider :theme-overrides="theme">
    <n-space vertical size="medium" style="min-height: calc(100vh - 64px)" justify="space-evenly" align="center">
        <n-layout align="center">
            <n-layout-content style="padding-bottom: 25px">
                <img src="../images/404.png" style="width: 40%; height: 40%">
            </n-layout-content>
            <n-layout-content>
                <n-space vertical>
                    <span class="t-h1">Uh? Sembra che la pagina non esista</span>
                    <span class="t-large">Il team di Skupply si scusa per il disagio. Visita il negozio per riprendere la tua esperienza!</span>
                </n-space>
            </n-layout-content>
            <n-layout-content style="padding-top: 72px">
                <n-button round size="large" type="primary">Visita il negozio</n-button>
            </n-layout-content>
        </n-layout>
    </n-space>
  </n-config-provider>
</template>

<style scoped>
</style>