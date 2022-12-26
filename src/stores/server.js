import { defineStore } from 'pinia'

export const useServerStore = defineStore('server', {
  state: () => {
    const address = 'http://localhost:3000' //'https://skupply-api.herokuapp.com'
    return {
      cartEndpoint: `${address}/cart`,
      emailEndpoint: `${address}/email`,
      loginEndpoint: `${address}/login`,
      productsMedia: `${address}/products`,
      userEndpoint: `${address}/user`,
      productEndpoint: `${address}/item`,
      sellerEndpoint: `${address}/seller`,
      wishlistEndpoint: `${address}/wishlist`,
      searchEndpoint: `${address}/search`,
      reviewEndpoint: `${address}/review`,
      chatEndpoint: `${address}/chat`,
    };
  }
})
