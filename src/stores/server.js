import { defineStore } from 'pinia'

export const useServerStore = defineStore('server', {
  state: () => {
    const address = 'http://localhost:3000'
    return {
      emailEndpoint: `${address}/email`,
      loginEndpoint: `${address}/login`,
      userEndpoint: `${address}/user`,
      cartEndpoint: `${address}/cart`,
      wishlistEndpoint: `${address}/wishlist`,
    };
  }
})
