<script>
// Components Imports
import SignupBaloon from '../components/images/SignupBaloon.vue' 
import SignupChart from '../components/images/SignupChart.vue'
import SignupGirl from '../components/images/SignupGirl.vue'
import SignupLaptop from '../components/images/SignupLaptop.vue'
import SignupForm0 from '../components/SignupForm0.vue'
import SignupForm1 from '../components/SignupForm1.vue'
import SignupForm2 from '../components/SignupForm2.vue'

export default {
  data() {
    return { signupData: {}, index: 0 }
  },
  components: {
    SignupBaloon,
    SignupChart,
    SignupGirl,
    SignupLaptop,
    SignupForm0,
    SignupForm1,
    SignupForm2
  },
  methods: {
    async receiveData(data) {
      this.signupData = {...this.signupData, ...data}

      switch (this.index) {
        case 0:
          if ('firstname' in this.signupData && 'lastname' in this.signupData && 'username' in this.signupData && 'email' in this.signupData)
            this.index++
          break;
        case 1:
          if ('password' in this.signupData)
            this.index++
          break;
        case 2:
          this.index++
          break;
      }
    }
  }
}
</script>

<template>
  <n-space v-if="index == 0" class="container" justify="space-evenly" align="center">
    <SignupGirl size="400"/>
    <n-card class="card">
      <SignupForm0 @submit="receiveData"/>
    </n-card>
  </n-space>
  <n-space v-else-if="index == 1" class="container" justify="space-evenly" align="center">
    <SignupLaptop size="400"/>
    <n-card class="card">
      <SignupForm1 @submit="receiveData"/>
    </n-card>
  </n-space>
  <n-space v-else-if="index == 2" class="container" justify="space-evenly" align="center">
    <SignupChart size="400"/>
    <n-card class="card">
      <SignupForm2 :data="signupData" @submit="receiveData"/>
    </n-card>
  </n-space>
  <n-space v-else-if="index == 3" vertical class="container" justify="space-evenly" align="center">
    <SignupBaloon size="400"/>
    <n-h1>Registrazione completata!</n-h1>
    <n-p>Controlla la tua casella email per verificare l'account</n-p>
  </n-space>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px);
  padding: 25px calc(15vw - 100px);
  box-sizing: border-box;
}

.card {
  width: calc(15vw + 150px);
}
</style>
