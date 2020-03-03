import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var test = {
  testa: "testa111"
}
setTimeout(() => {
  test.testa = "testa222"
}, 2000);
function a() {
  console.log("aaa");
}
a.install = function (vue) {
  vue.util.defineReactive(test, "testa")
  // 全局混入vue实例
  vue.mixin({
    data() {
      return {
        mixinText: "iam mixin text"
      }
    },
    method: {

    },
    beforeCreate() {
      this.test = test
    },
    // 生命周期注入
    created() {
      console.log("iam create");
    }
  })
}

Vue.use(a)

new Vue({
  render: h => h(App),
}).$mount('#app')
