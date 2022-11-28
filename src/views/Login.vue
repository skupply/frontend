<script>
// Components imports
import LoginDoor from '../components/images/LoginDoor.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    LoginDoor,
    LoginForm
  }
}
</script>

<template>
  <n-space class="container" justify="space-evenly" align="center" style="min-height: calc(100vh - 64px);">
    <LoginDoor size="500"/>
    <n-card style="width: calc(15vw + 150px);">
      <LoginForm/>
    </n-card>
  </n-space>
</template>

<style scoped>
.container {
  padding: 50px calc(15vw - 100px);
  box-sizing: border-box;
}
</style>
