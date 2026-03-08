import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/apply-leave',
      name: 'applyLeave',
      component: () => import('../views/employee/ApplyLeaveView.vue'),
      meta: { requiresAuth: true, role: 'employee' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.name === 'login' && token) {
    next('/dashboard');
  } else if (to.meta.role && user.role !== to.meta.role) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
