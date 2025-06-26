import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Links from '../views/Links.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/links', component: Links }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
