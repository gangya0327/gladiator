import Vue from 'vue'
import App from './App.vue'

import './icons'
import SvgIcon from './components/SvgIcon'
import router from './router'
import store from './store'
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
