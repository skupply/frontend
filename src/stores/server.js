import { defineStore } from 'pinia'

export const useServerStore = defineStore('server', {
  state: () => {
    const address = 'http://localhost:3000'
    return {
      cartEndpoint: `${address}/cart`,
      emailEndpoint: `${address}/email`,
      loginEndpoint: `${address}/login`,
      productsMedia: `${address}/products`,
      userEndpoint: `${address}/user`,
      wishlistEndpoint: `${address}/wishlist`,
    };
  }
})
