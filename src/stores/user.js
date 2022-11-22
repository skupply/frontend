import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

//il reset porta allo stato iniziale ovverro valori a null
const defaultState = {
  token: null, 
  email: null
}

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      token: useStorage('token', null), 
      email: useStorage('email', null)
    };
  },
  actions: {
    setToken(token) { this.token = token; },
    setEmail(email) { this.email = email; },
    reset() {Object.assign(this, defaultState)},
  },
  persist: {
    enabled: true
  }
});
