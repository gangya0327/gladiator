import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List'),
    children: [
      // { path: '/list', name: 'List', component: () => import('../views/List') },
      { path: '/detail/:id', name: 'Detail', component: () => import('../views/Detail'), props: true },
    ]
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: () => import('../views/VuexTest')
  },
  {
    path: '/kvuex',
    name: 'KVuex',
    component: () => import('../views/KVuexTest')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// beforeEnter 路由级守卫
// beforeRouteEnter 组件级守卫
// beforeEach 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !window.isLogin) {
    if (window.confirm('请登录')) {
      window.isLogin = true
      next() // 登录成功继续下一步
    } else {
      next('/') // 放弃返回首页
    }
  } else {
    console.log(to)
    next() // 不需要登录，直接跳转
  }
})

export default router
