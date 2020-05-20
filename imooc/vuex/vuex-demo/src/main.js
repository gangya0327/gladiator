import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.use(Vuex)
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     countIncrease(state, newVal) {
//       if (newVal) {
//         state.count = newVal
//       } else {
//         state.count++
//       }
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  console.log('store.state', store.state)
  console.log('to', to)
  // 如果userInfo为空，且当前路径不为login，就跳到login页面
  if (store.state.userInfo || to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }

})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
