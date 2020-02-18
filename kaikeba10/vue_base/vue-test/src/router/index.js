import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: "/",
      component: List
    }, {
      path: "/detail/:id",
      component: Detail,
      props: true
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter(to, from, next) {
      // 判断是否登录
      if (!window.isLogin) {
        next("/login?redirect=" + to.path)
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 每次路由激活之前会调用的函数
// router.beforeEach((to, from, next) => {
//   // 判断是否登录
//   if (to.path === "/about" && !window.isLogin) {
//     next("/login?redirect=" + to.path)
//   } else {
//     next()
//   }
// })

/**
 * 导航解析流程
 * 1 导航被触发
 * 2 调用全局的beforeEach守卫
 * 3 在重用的组件里调用beforeRouteUpdate守卫
 * 4 在路由配置里调用beforeEnter守卫
 * 5 在被激活的组件里调用beforeRouteEnter守卫
 * 6 调用全局的beforeResolve守卫
 * 7 导航被确认
 * 8 调用全局的afterEach钩子
 * 9 触发dom更新
 */

export default router
