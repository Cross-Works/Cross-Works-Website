// Import Vue Router
import { defineAsyncComponent } from 'vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: defineAsyncComponent(() => import('../views/HomePage.vue'))
  },
  {
    path: '/news',
    name: 'News',
    component: defineAsyncComponent(() => import('../views/NewsListing.vue'))
  },
  {
    path: '/news/:docId',
    name: 'SingleNews',
    component: defineAsyncComponent(() => import('../views/NewsSingle.vue'))
  },
  {
    path: '/cities',
    name: 'Cities',
    component: defineAsyncComponent(() => import('../components/PanelCities.vue'))
  },
  {
    path: '/technology',
    name: 'Tech',
    component: defineAsyncComponent(() => import('../components/PanelTech.vue'))
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: defineAsyncComponent(() => import('../views/NotFound.vue'))
  }
]

export default routes 