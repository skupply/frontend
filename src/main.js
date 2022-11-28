// Packages imports
import naive from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Files imports 
import router from './router/index.js'

// Components imports
import App from './App.vue'

// Styles imports
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(naive)

app.mount('#app')
