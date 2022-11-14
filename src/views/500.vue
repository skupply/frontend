<script scoped>
export default {
  data(){
    return {
      theme:{
        Button: {
            paddingRoundLarge: "25px 72px"
          }
      }
    }
  }
}
</script>

<template>
<n-config-provider :theme-overrides="theme">
    <n-space vertical size="medium" style="min-height: calc(100vh - 64px);" justify="space-evenly" align="center">
        <n-layout align="center">
            <n-layout-content style="padding-bottom: 25px">
                <img src="../images/500.png" style="width: 50%; height: 50%">
            </n-layout-content>
            <n-layout-content style="padding-top: 40px;">
                <n-space vertical>
                    <span class="t-h1">Uh? Sembra che la pagina non esista</span>
                    <span class="t-large">Il team di Skupply si scusa per il disagio. Visita il negozio per  riprendere la tua esperienza.<br/>
                    Se il problema persiste contattaci, saremo lieti di aiutarti!</span>
                </n-space>
            </n-layout-content>
            <n-layout-content style="padding-top: 20px">
                <n-space justify="center" size="large">
                    <n-button round size="large" type="primary" block>Visita il negozio</n-button>
                    <n-button round size="large" type="info" block>Contattaci</n-button>
                </n-space>
            </n-layout-content>
        </n-layout>
    </n-space>
</n-config-provider>
</template>

<style scoped>
</style>