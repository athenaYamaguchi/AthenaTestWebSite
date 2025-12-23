import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '../views/TopPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import MasterManagePage from '../views/MasterManagePage.vue'

const routes = [
  {
    path: '/',
    component: TopPage
  },
  {
    path: '/settings-page',
    component: SettingsPage
  },
  {
    path: '/MasterManagePage',
    component: MasterManagePage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
