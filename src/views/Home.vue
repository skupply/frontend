<script>
// Packages imports
import { markRaw } from 'vue'

// Files imports 
import theme from '../assets/theme'

// Components imports
import HomeCard from '../components/HomeCard.vue'
import HomeBook from '../components/images/HomeBook.vue'
import HomeDashboard from '../components/images/HomeDashboard.vue'
import HomeHandshake from '../components/images/HomeHandshake.vue'
import HomeShopping from '../components/images/HomeShopping.vue'

export default {
  data() {
    return {
      color: theme.Typography.pTextColor,
      decorationStyle: { backgroundColor: theme.common.primaryColor },
      hStyle: { lineHeight: '2rem', color: theme.common.foreground },
      pStyle: { marginBottom: '2rem', color: theme.common.foreground },
      cards: [
        {
          title: 'Cerca, trova e risparmia!',
          text: [ "Si sta avvicinando l'inizio dell'anno scolastico e la lista della spesa è lunga?", "Entra in Skupply e risparmia cercando tra centinaia di prodotti di seconda mano." ],
          image: HomeShopping
        },
        {
          title: 'Guadagna da ciò che non usi più!',
          text: [ "Quante volte hai comprato del materiale per utilizzarlo un paio di volte e dimenticarlo nel cassetto?", "È ora di dargli nuova vita e di guadagnarci qualcosina." ],
          image: HomeHandshake
        },
        {
          title: 'Semplice, veloce e sicuro!',
          text: [ "Sfoglia il negozio, contatta i venditori, riempi il carrello e ricevi comodamente a casa", "Entra in Skupply e risparmia cercando tra centinaia di prodotti di seconda mano." ],
          image: HomeDashboard
        }
      ]
    }
  },
  components: {
    HomeCard,
    HomeBook,
    HomeDashboard: markRaw(HomeDashboard),
    HomeHandshake: markRaw(HomeHandshake),
    HomeShopping: markRaw(HomeShopping)
  }
}
</script>

<template>
  <n-space class="container" justify="space-evenly" style="flex-wrap: nowrap;">
    <n-space vertical size="large" style="width: 35vw;">
      <n-h1 style="line-height: 4rem;">La scuola a misura di portafoglio</n-h1>
      <n-p>Visita il nostro marketplace dove moltissimi studenti comprano, vendono ma soprattutto risparmiano su centinaia di prodotti scolastici.</n-p>
      <n-button round size="large" type="info" @click="this.$router.push('/market')" style="margin-top: 10px;">Visita il negozio</n-button>
    </n-space>
    <HomeBook size="400"/>
  </n-space>

  <n-space class="container decoration" vertical size="large" align="center" :style="decorationStyle">
    <n-space vertical align="center">
      <n-h3 :style="hStyle">Come funziona?</n-h3>
      <n-p :style="pStyle">Su Skupply tutto è più semplice. Scopri come sfruttare al meglio la piattaforma!</n-p>
    </n-space>
    <HomeCard v-for="(item, index) in cards" image width="60vw" height="250px" :alignment="index">
      <template v-slot:title><n-p class="title" :style="{ color: color }">{{item.title}}</n-p></template>
      <template v-slot:text><n-p v-for="phrase in item.text" class="text">{{phrase}}</n-p></template>
      <template v-slot:image><component :is="item.image" size="200"/></template>
    </HomeCard>
  </n-space>

  <n-space class="container" justify="space-evenly" align="center">
    <n-space vertical>
      <n-h1 style="line-height: 4rem;">Pronto per iniziare?</n-h1>
      <n-p>Sfoglia gli annunci o creane uno</n-p>
    </n-space>
    <n-space size="large">
      <n-button round size="large" type="info" @click="this.$router.push('/market')">Visita il negozio</n-button>
      <n-button round size="large" type="primary" @click="this.$router.push('/sell')">Inizia a vendere</n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  padding: 100px calc(15vw - 100px);
  box-sizing: border-box;
}

.decoration {
  flex-wrap: nowrap;
  background-size: 100% 100%;
  background-image: url("../assets/images/Decoration.svg");
}

.card {
  width: 60vw;
}

.title {
  font-weight: 600;
  font-size: 1.25rem;
}

.text {
  font-size: 1.1rem;
}
</style>
