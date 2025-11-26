import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/TopPage.vue';
import About from '../views/SettingsPage.vue';

const routes = [
  { path: '/', name: 'TopPage', component: Home },
  { path: '/SettingsPage', name: 'SettingsPage', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
