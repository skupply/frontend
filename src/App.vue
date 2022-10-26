<script>
  export default {
    data() {
      return {
        theme: {
          common: {
            primaryColor: '#44355BFF',
            primaryColorHover: '#695D7CFF',
            primaryColorPressed: '#362A49FF',
            primaryColorSuppl: '#695D7CFF',

            // Non credo funzioni
            secondaryColor: '#FA4F2EFF',
            secondaryColorHover: '#FB7258FF',
            secondaryColorPressed: '#C83F25FF',
            SecondaryColorSuppl: '#FB7258FF',
          }
        }
      }
    }
  }
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-button>Test</n-button>
  </n-config-provider>
</template>

<style scoped>
</style>