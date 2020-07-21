import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from './store'
// import store from './mystroe'
import router from './router'
import interceptor from './interceptor'

import { createAPI } from 'cube-ui'
import CartAnim from '@/components/CartAnim'

import create from '@/utils/create'

// 注册全局组件，$createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])

Vue.config.productionTip = false

Vue.prototype.$create = create

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

interceptor(app)
