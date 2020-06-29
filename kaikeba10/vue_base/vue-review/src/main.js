import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$buss = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
