import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ROUTES } from "@/consts/routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.LOGIN,
      name: "login",
      component: () => import("@/views/auth/login/LoginForm.vue"),
    },
    {
      path: ROUTES.REGISTER,
      name: "register",
      component: () => import("@/views/auth/register/RegisterForm.vue"),
    },
    {
      path: "/",
      component: DefaultLayout,
      redirect: ROUTES.DASHBOARD,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/DashboardView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
NProgress.configure({ showSpinner: false, speed: 500 });
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const authStore = useAuthStore();
  const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];
  const isPublic = publicRoutes.includes(to.path);
  const requiresAuth = to.meta.requiresAuth;

  // Initialize auth store on first load
  if (!authStore.isInitialized && authStore.isAuthenticated) {
    await authStore.initialize();
  }

  // If user is authenticated and trying to go to login/register, redirect to dashboard
  if (authStore.isAuthenticated && isPublic) {
    next("/dashboard");
  }
  // If route requires auth and user is not authenticated, redirect to login
  else if (requiresAuth && !authStore.isAuthenticated) {
    next(ROUTES.LOGIN);
  }
  // Otherwise allow navigation
  else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
