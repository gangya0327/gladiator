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
    meta: { title: '首页', icon: 'qq' },
    children: [
      {
        path: 'home',
        component: () => import("@/views/Home"),
        name: 'home',
        meta: { title: 'Home', icon: 'qq' }
      },
      {
        path: 'bar',
        component: () => import("@/views/Home"),
        name: 'bar',
        meta: { title: 'Bar', icon: 'qq', roles: ['editor'] }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/Test'),
    name: 'test'
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
        meta: { title: 'about', icon: 'wechat', roles: ['admin'] }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_ENV,
  routes: constRoutes
})
