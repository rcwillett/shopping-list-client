import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import SignUpView from '../views/SignUp.vue';
import ListView from '../views/List.vue';
import { useUserStore } from '../stores/user';


const router = createRouter({
  beforeEach: (to, from, next) => {
    const userStore = useUserStore();
    if ((to.name !== 'login' || to.name !== 'signup') && !userStore.user) next({ name: 'login' });
    else if ((to.name === 'login' || to.name === 'signup') && userStore.user) next({ name: 'list' });
    else next();
  },
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
