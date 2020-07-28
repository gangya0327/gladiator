import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

export const constRoutes = [
  {
    path: "/login",
    // name: "Login",
    component: () => import("@/views/Login"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/Home"),
        name: "home",
        meta: {
          title: "Home",
          icon: "badge"
        }
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/About"),
        name: "about",
        meta: {
          title: "About",
          icon: "integer",
          roles: ["admin"]
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});

export default router;
