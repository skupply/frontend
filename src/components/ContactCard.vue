<script>
// Components imports
import { Icon } from '@vicons/utils'
import { ImageOutline } from '@vicons/ionicons5'

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      smallLabel
    }
  },
  components: {
    Icon,
    ImageOutline,
  },
  props: {
    user1: { type: String, required: true },//lo user che ha iniziato la chat
    user2: { type: String, required: true },//lo user che è stato mittente al primo messaggio
    image: { type: String, default: null },
  }
}
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010); min-width: 400px; max-width: 400px;">
    <n-space size="large" justify="space-between" align="center" style="min-height: 100px; min-width: 950px; flex-wrap: nowrap;">
      <n-space style="flex-wrap: nowrap;">
        <img v-if="image" class="image" :src="image" :alt="title"/>
        <n-space v-else class="image" justify="center" align="center">
          <Icon size="25" color="#00000040" style="display: flex; align-items: center;"><ImageOutline/></Icon>
        </n-space>

        <n-space vertical justify="space-between" style="margin: 0 0 0 25px;">
          <n-space vertical>
            <n-h4 class="title">{{user1}}</n-h4>
            <n-text :style="{ color: smallLabel }">{{user2}}</n-text>
          </n-space>
        </n-space>
      </n-space>
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
  max-width: 15vw;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7rem;
  white-space: nowrap;
}


</style>
