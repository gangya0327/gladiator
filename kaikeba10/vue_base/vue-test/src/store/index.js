import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    goods: []
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    show(state) {
      console.log(state.goods);
    },
    addCartStore(state, good) {
      let ret = state.goods.find(item => item.id === good.id)
      if (ret) {
        ret.count += 1
      } else {
        state.goods.push({ ...good, count: 1 })
      }
      console.log("store改变了 ", state.goods);
    }
  },
  actions: {
    requestLogin(context, payload) {
      console.log(context, payload);
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit("login")
          resolve(true)
        }, 1000);
      })
    }
  },
  modules: {
  }
})
