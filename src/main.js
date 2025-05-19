import './assets/scss/main.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import your routes
import routes from './router'

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the Vue application
const app = createApp(App)
app.use(router)
app.mount('#app')
