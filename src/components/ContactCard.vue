<script>
// Components imports
import { Icon } from '@vicons/utils'
import { ImageOutline } from '@vicons/ionicons5'

export default {
  data() {
    const smallLabel = '#00000060'

    return {
      hover: false,
      smallLabel
    }
  },
  components: {
    Icon,
    ImageOutline,
  },
  props: {
    id: {type: String, required: true},//l'id che identifica la chat
    user: { type: String, default: "" },//lo user con cui si ha una chat
    image: { type: String, default: null },
  }
}
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010); min-width: 400px; max-width: 400px;"
    @mouseenter = "hover = true"
    @mouseleave = "hover = false"
    @click="$emit('openChat', this.id, this.user)"
    :class="{'div-hover': hover}"
  >
    <n-space size="large" justify="space-between" align="center" style="min-height: 100px; min-width: 370px; flex-wrap: nowrap;">
      <n-space style="flex-wrap: nowrap;">
        <img v-if="image" class="image" :src="image" :alt="title"/>
        <n-space v-else class="image" justify="center" align="center">
          <Icon size="25" color="#00000040" style="display: flex; align-items: center;"><ImageOutline/></Icon>
        </n-space>

        <n-space vertical justify="space-between" style="margin: 0 0 0 25px;">
          <n-space vertical>
            <n-h5 class="title">{{user}}</n-h5>
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
  font-size: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7rem;
  white-space: nowrap;
}

.div-hover {
    background-color: #BDBDBD;
}

</style>
