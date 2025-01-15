import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login, // Root path renders the Login component
  },
  {
    path: '/Login',
    redirect: '/', // Redirect /Login to /
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) {
        next('/'); // Redirect to root if not logged in
      } else {
        next(); // Proceed to Dashboard
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
