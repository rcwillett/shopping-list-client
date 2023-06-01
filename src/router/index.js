import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import SignUpView from '../views/SignUp.vue';
import ListView from '../views/List.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
    },
  ]
})

export default router
