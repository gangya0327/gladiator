import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

// 通用页面，不需要权限
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import("@/views/Home"),
        name: 'home',
        meta: { title: 'Home', icon: 'qq' }
      }
    ]
  }
]

// 权限页面
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        name: 'about',
        component: () => import('@/views/About'),
        meta: { title: 'about', icon: 'qq', roles: ['admin', 'editor'] }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_ENV,
  routes: constRoutes
})
