import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/TopPage.vue';
import SettingsPage from '../views/SettingsPage.vue';

const routes = [
  { path: '/', name: 'TopPage', component: HomePage },
  { path: '/settings-page', name: 'settings-page', component: SettingsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
