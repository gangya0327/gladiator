import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('./pages/index.vue')
    }
  ]
})

export default router