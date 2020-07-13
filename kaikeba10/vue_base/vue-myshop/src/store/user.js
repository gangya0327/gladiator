import us from '../services/user'

export default ({
  state: {
    isLogin: !!localStorage.getItem('token')
  },
  mutations: {
    setLoginState(state, val) {
      state.isLogin = val
    }
  },
  actions: {
    async login({ commit }, userInfo) {
      const { token } = await us.login(userInfo)
      // code,token,data
      if (token) {
        // 登陆成功
        commit('setLoginState', true)
        localStorage.setItem('token', token)
        return true
      }
      return false
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('setLoginState', false)
    }
  },
  modules: {
  }
})