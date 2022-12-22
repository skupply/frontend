<script>
export default {
  props: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    image: { type: Boolean, default: false },
    alignment: { type: Number, default: 0 }
  }
}
</script>

<template>
  <n-card :style="{ width: width, minHeight: height }">
    <n-space justify="space-between" size="large" style="flex-wrap: nowrap;">
      <slot v-if="image && (alignment % 2)" name="image"></slot>
      <n-space vertical :style="{ margin: (!image && alignment ? '0' : '0 20px') }">
        <slot name="title"></slot>
        <slot name="text"></slot>
      </n-space>
      <slot v-if="image && !(alignment % 2)" name="image"></slot>
    </n-space>
  </n-card>
</template>

<style scoped>
</style>
