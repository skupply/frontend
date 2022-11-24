import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

//il reset porta allo stato iniziale ovverro valori a null
//come definito qui sotto in defaultState
const defaultState = {
  token: null, 
  email: null,
  username: null,
}

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      token: useStorage('token', null), 
      email: useStorage('email', null),
      username: useStorage('username', null),
    };
  },
  actions: {
    //setters
    setToken(token) { this.token = token; },
    setEmail(email) { this.email = email; },
    setUsername(username) { this.username = username; },

    //getters
    getToken() {return this.token},
    getEmail() { return this.email},
    getUsername() { return this.username},

    //others
    reset() {Object.assign(this, defaultState)},
  },
  //sessione persistente nelle pagine
  persist: {
    enabled: true
  }
});
