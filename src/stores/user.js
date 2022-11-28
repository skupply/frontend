import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      codeparam: 'code',
      data: useStorage('data', {}),
      token: useStorage('token', null),
      logged: useStorage('logged', false)
    };
  }
})
