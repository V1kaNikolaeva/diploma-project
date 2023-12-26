import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: { name: 'income' },
      children: [
        {
          path: 'income',
          name: 'income',
          props: true,
        },
        {
          path: 'expenses',
          name: 'expenses',
          props: true,
        },
      ]
    },
    {
      path: '/profile',
      name: 'profile',
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/ProfileView.vue'),
    // },
    // {
    //   path: '/graphics',
    //   name: 'graphics',
    //   component: () => import('../views/ProfileView.vue'),
    // },
  ]
})

export default router
