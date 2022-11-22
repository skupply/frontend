<script>
</script>

<template>
 <n-tab-pane name="Account" tab="Account">
    <n-grid :cols="3" :rows="5" :y-gap="30">
        <n-grid-item>
            <span class="t-h5">Info personali</span>
        </n-grid-item>

        <n-grid-item>
            <span class="t-h5">Info d'accesso</span>
        </n-grid-item>

        <n-grid-item>
            <span class="t-h5">Info spedizione</span>
        </n-grid-item>

        <n-grid-item>
            <n-input round placeholder="Medium" />
        </n-grid-item>
    </n-grid>
</n-tab-pane>
</template>

<style scoped>
</style>