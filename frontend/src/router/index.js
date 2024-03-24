import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from '../../services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home/:id",
      name: "home",
      meta: {
        requireGuest: false,
        requireAuth: true,
      },
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/head",
      name: "head",
      meta: {
        requireGuest: true,
        requireAuth: true,
      },
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requireGuest: false,
        requireAuth: true,
      },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      meta: {
        requireGuest: true,
        requireAuth: true,
      },
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requireGuest: true,
        requireAuth: true,
      },
      component: () => import("../views/LogInView.vue"),
    },
    {
      path: "/graphs/:id",
      name: "graphs",
      meta: {
        requireGuest: false,
        requireAuth: true,
      },
      component: () => import("../views/GraphsView.vue"),
    },
    { 
      path: "/:pathMatch(.*)*", 
      name: "NotFound",
      meta: {
        requireGuest: true,
        requireAuth: true,
      }, 
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});


router.beforeEach((to, from) => {
  if (isAuthenticated()) {
    if (to.name === 'login') {
      router.push('/profile')
    }

  } else if (!isAuthenticated()) {
    if (to.meta.requireGuest === false) {
      router.push('/signup')
    }
  }
})

export default router;
