import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return { token: null };
  },
  actions: {
    setToken(token) { this.token = token; }
  },
});