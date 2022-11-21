import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      token: useStorage('token', null), 
      email: useStorage('email', null)
    };
  },
  actions: {
    setToken(token) { this.token = token; },
    setEmail(email) { this.email = email; }
  },
  persist: {
    enabled: true
  }
});