import { createRouter, createWebHistory } from 'vue-router';
import LoginAc from '@/components/LoginAc.vue';
import DashboardVS from '@/components/DashboardVS.vue';

const routes = [
  {
    path: '/login', // Login path
    name: 'LoginAc',
    component: LoginAc,
  },
  {
    path: '/DashboardVS', // Dashboard path
    name: 'DashboardVS',
    component: DashboardVS,
    // Guard to check if the user is logged in
    beforeEnter: (to, from, next) => {
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) {
        next('/loginac'); // If not logged in, redirect to login
      } else {
        next(); // Proceed to Dashboard if logged in
      }
    }
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
