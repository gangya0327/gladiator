import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import router from './router/krouter'
import Bus from './plugins/bus'

// import store from './store'
import store from './store/kindex'

Vue.use(Bus)

Vue.config.productionTip = false

Vue.component('comp', {
  // template: '<div>aaa</div>'
  // render(h) {
  //   return h('div', { class: 'aa', attrs: { id: 'dd' }}, [h('span', 'bb')])
  // }
  render() {
    return <div>aaabbb</div>
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
