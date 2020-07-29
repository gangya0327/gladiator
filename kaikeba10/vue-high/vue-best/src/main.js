import Vue from 'vue'
import App from './App.vue'

import './icons'
import SvgIcon from './components/SvgIcon'
import router from './router'
import store from './store'
Vue.component('svg-icon', SvgIcon)

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

import vPermission from '@/directive/permission'
Vue.directive('permission', vPermission)

// 路由守卫
import '@/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
