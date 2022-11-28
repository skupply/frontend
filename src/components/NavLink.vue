<script>
// Files imports 
import theme from '../assets/theme'

// Components imports
import { Icon } from '@vicons/utils'

export default {
  data() {
    return { color: theme.Typography.pTextColor }
  },
  components: { Icon },
  props: {
    label: { type: String, required: true },
    link: { type: String, required: true },
  }
}
</script>

<template>
  <router-link class="navlink" :to="link">
    <n-space justify-content="space-between" align="center" style="padding: 0 .5vw; flex-wrap: nowrap;">
      <Icon size="28" :color="color" style="display: inline-block"><slot/></Icon>
      <n-p>{{label}}</n-p>
    </n-space>
  </router-link>
</template>

<style scoped>
.navlink { text-decoration: none; }
</style>
