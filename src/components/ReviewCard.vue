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
    username: { type: String, required: true },
    title: { type: String, required: true },
    review: { type: String, default: null },
    image: { type: String, default: null },
    rating: { type: Number, required: true },
  }
}
</script>

<template>
  <n-card style="filter: drop-shadow(0 4px 8px #00000010); min-width: 1000px;">
    <n-space size="large" justify="space-between" align="center" style="min-height: 100px; min-width: 950px; flex-wrap: nowrap;">
      <n-space style="flex-wrap: nowrap;">
        <img v-if="image" class="image" :src="image" :alt="title"/>
        <n-space v-else class="image" justify="center" align="center">
          <Icon size="25" color="#00000040" style="display: flex; align-items: center;"><ImageOutline/></Icon>
        </n-space>

        <n-space vertical justify="space-between" style="margin: 0 0 0 25px;">
          <n-space vertical>
            <n-h4 class="title">{{username}}</n-h4>
            <n-text></n-text>
          </n-space>

          <n-space align="end" style="flex-wrap: nowrap;">
            <n-rate readonly :default-value="rating" />
          </n-space>
        </n-space>

        <n-space vertical align="start" style="padding-left: 48px">
            <n-space>
                <n-h5 class="titleReview">{{title}}</n-h5>
            </n-space>
            <n-space>
                <n-h5 class="review">{{review}}</n-h5>
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

.titleReview {
  font-size: 25px;
  max-width: calc(15vw + 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.7rem;
  white-space: nowrap;
}

.review {
  font-size: 13px;
  color: black;
  max-width: 200ch;
  word-wrap: break-word;
  line-height: 1.7rem;
}

a:link{
  text-decoration: none;
}

</style>
