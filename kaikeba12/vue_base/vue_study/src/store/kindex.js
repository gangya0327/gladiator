import Vue from 'vue'
import KVuex from '../kvuex'

Vue.use(KVuex)

export default new KVuex.Store({
  state: {
    count: 0
  },
  getters: {
    score(state) {
      return 'score: ' + state.count
    }
  },
  mutations: {
    add(state, num = 1) {
      state.count += num
    }
  },
  actions: {
    asyncAdd({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('add', 5)
          resolve({ ok: 1 })
        }, 1000)
      })
    }
  }
})
