import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/product/:id', component: ProductPage },
  { path: '/cart', component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp({});
app.use(router);

export default router;
