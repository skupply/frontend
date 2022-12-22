<script setup>
    defineProps({
        subtitle : String,
        title: String,
        text: String,
        button: String,
    })
</script>

<template>
  <n-card class="card">
    <n-space vertical size="large">
      <n-text depth="3">{{subtitle}}</n-text>
      <n-h5 style="line-height: 10px; margin-bottom: 10px;">{{title}}</n-h5>
      <n-text class="text" style="font-size: 0.85rem">{{text}}</n-text>
      <n-button block round type="primary" size="medium" style="margin-top: 20px">{{button}}</n-button>
    </n-space>
  </n-card>
</template>

<style scoped>
.card {
  width: 250px;
  border-radius: 20px;
  box-sizing: border-box;
  filter: drop-shadow(0 4px 16px #00000020);
}
</style>

