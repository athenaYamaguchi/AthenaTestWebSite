import { createRouter, createWebHistory } from 'vue-router';
import TopPage from '../views/TopPage.vue';
import SettingsPage from '../views/SettingsPage.vue';

const routes = [
  { path: '/', name: 'TopPage', component: TopPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
