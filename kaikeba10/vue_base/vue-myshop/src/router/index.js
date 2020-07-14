import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Mylogin from '../views/Mylogin'
import Cart from '../views/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/mylogin',
    name: 'Mylogin',
    component: Mylogin
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     if (!localStorage.getItem('mytoken')) {
//       next({
//         path: '/mylogin',
//         query: { redirect: to.path }
//       })
//     }
//     next()
//   }
//   next()
// })

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 只要本地有token，则认为已登陆
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

export default router
