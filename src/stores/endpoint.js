import { defineStore } from 'pinia';

export const useEndpointStore = defineStore('endpoint', {
  state: () => {
    return { endpoint: 'http://localhost:3000' };
  },
  actions: {
    setEndpoint(endpoint) { this.endpoint = endpoint; }
  },
});