import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '../views/TopPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  {
    path: '/',
    component: TopPage
  },
  {
    path: '/settings-page',
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
