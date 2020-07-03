import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    loginState(state) {
      return state.isLogin ? '欢迎回来' : '游客'
    }
  },
  mutations: {
    login(state) {
      state.isLogin = true
    }
  },
  actions: {
    alogin(context, payload) {
      console.log('context', context)
      console.log('payload', payload)
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     context.commit('login')
      //     resolve(true)
      //   }, 1000);
      // })
      setTimeout(() => {
        context.commit('login')
      }, 1000);
    }
  },
  modules: {
  }
})
