import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: () => import('../views/GraphsView.vue'),
    },
  ]
})

export default router
