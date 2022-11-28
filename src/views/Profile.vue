<script>
// Files imports 
import theme from '../assets/theme'

// States imports
import { useUserStore } from '../stores/user'

export default {
  data() {
    const user = useUserStore()
    return {
      private: true,
      theme, user
    }
  }
}
</script>

<template>
  <n-space vertical class="container" :style="{ backgroundColor: theme.common.primaryColor }">
    <n-space justify="space-between" align="center">
      <n-h1 :style="{ color: theme.common.foreground }">Ciao {{user.data.username}}!</n-h1>
      <n-space>
        <n-button round size="large" @click="user.token = null; $router.push('/login')" :style="{ color: theme.common.foreground }">Logout</n-button>
        <n-button round type="info" size="large" @click="private = !private">{{private ? 'Profilo venditore' : 'Profilo privato'}}</n-button>
      </n-space>
    </n-space>
    <n-card style="border-radius: 25px;">
      <n-tabs v-if="private" type="line" animated>
        <n-tab-pane name="offers" tab="Offerte">
          <n-p>Offerte</n-p>
        </n-tab-pane>
        <n-tab-pane name="purchases" tab="Acquisti">
          <n-p>Acquisti</n-p>
        </n-tab-pane>
      </n-tabs>
      <n-tabs v-else type="line" animated>
        <n-tab-pane name="posts" tab="Annunci">
          <n-p>Annunci</n-p>
        </n-tab-pane>
        <n-tab-pane name="proposes" tab="Proposte">
          <n-p>Proposte</n-p>
        </n-tab-pane>
        <n-tab-pane name="orders" tab="Ordini">
          <n-p>Ordini</n-p>
        </n-tab-pane>
        <n-tab-pane name="payments" tab="Pagamenti">
          <n-p>Pagamenti</n-p>
        </n-tab-pane>
        <n-tab-pane name="drafts" tab="Bozze">
          <n-p>Bozze</n-p>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

<style scoped>
.container {
  height: calc(100vh - 64px);
  padding: 50px calc(25vw - 100px);
  box-sizing: border-box;
}
</style>
