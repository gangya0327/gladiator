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
    children: [
      { path: '', name: 'list', component: List },
      { path: '/detail/:id', name: 'detail', component: Detail, props: true }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: { 'title': 'aboutttt' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 判断是否登录
  console.log('router beforeEach')
  console.log('to', to)
  if (to.path === '/about' && !window.isLogin) {
    next('/login?redirect=' + to.path)
  } else {
    next()
  }
})

/**
 * 路由流程
 * 1. 导航触发
 * 2. 调用全局beforeEach守卫
 * 3. 在重用的组件里调用beforeRouteUpdate守卫
 * 4. 在路由配置里调用beforeEnter守卫
 * 5. 在被激活的组件里调用beforeRouteEnter守卫
 * 6. 调用全局beforeResolve守卫
 * 7. 导航被确认
 * 8. 调用全局afterEach守卫
 * 9. DOM更新
 */

export default router
