<script>
// Components imports
import { Icon } from '@vicons/utils'

export default {
  components: { Icon },
  props: {
    link: { type: String, required: true },
    color: { type: String, required: true },
  }
}
</script>

<template>
  <a :href="link" target="_blank" style="padding: 5px">
    <Icon size="28" :color="color"><slot/></Icon>
  </a>
</template>

<style scoped>
</style>
