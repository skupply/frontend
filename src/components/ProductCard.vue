<script>
// Files imports
import theme from '../assets/theme'

// Components imports
import { Icon } from '@vicons/utils'
import { ImageOutline } from '@vicons/ionicons5'
import { Van } from '@vicons/carbon'

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      smallLabel,
      priceStyle: { lineHeight: '2rem', color: theme.common.infoColor },
    }
  },
  components: {
    Icon,
    ImageOutline,
    Van
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, default: null },
    price: { type: Number, required: true },
    shipping: { type: Number, default: 0.00 },
    location: { type: String, required: true }
  }
}
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010);">
    <n-space size="large" justify="space-between" align="center" style="height: 100px; flex-wrap: nowrap;">
      <n-space style="flex-wrap: nowrap;">
        <img v-if="image" class="image" :src="image" :alt="title"/>
        <n-space v-else class="image" justify="center" align="center">
          <Icon size="25" color="#00000040" style="display: flex; align-items: center;"><ImageOutline/></Icon>
        </n-space>

        <n-space vertical justify="space-between" style="margin: 0 25px 0 25px;">
          <n-space vertical>
            <router-link :to="`/product/?id=${id}`">
              <n-h4 class="title">{{title}}</n-h4>
            </router-link>
            <n-text :style="{ color: smallLabel }">{{location}}</n-text>
          </n-space>

          <n-space align="end" style="flex-wrap: nowrap;">
            <n-h4 :style="priceStyle">€ {{price.toFixed(2)}}</n-h4>
            <n-space align="center" style="margin-left: 15px">
              <Icon size="20" :color="smallLabel" style="display: flex; align-items: center;"><Van/></Icon>
              <n-text :style="{ fontWeight: 600, color: smallLabel }">€ {{shipping.toFixed(2)}}</n-text>
            </n-space>
          </n-space>
        </n-space>
      </n-space>
      <slot></slot>
    </n-space>
  </n-card>
</template>

<style scoped>
.image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #00000010;
  border: 1px solid #00000040;
}

.title {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7rem;
  white-space: nowrap;
}

a:link{
 text-decoration: none;
}

</style>
