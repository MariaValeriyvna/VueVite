import { createWebHistory, createRouter } from "vue-router";
import MainPage from '../pages/MainPage.vue';
import ArticlePage from '../pages/ArticlePage.vue';


const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'article', component: ArticlePage, path: '/article/:id' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
