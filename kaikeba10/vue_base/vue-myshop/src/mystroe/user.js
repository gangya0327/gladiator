import us from '../myservices/user'

const user = ({
  state: {
    isLogin: !!localStorage.getItem('token')
  },
  mutations: {
    setLoginState(state, val) {
      state.isLogin = val
    }
  },
  actions: {
    mylogin({ commit }, userinfo) {
      us.login(userinfo).then(({ token }) => {
        if (token) {
          commit('setLoginState', true)
          localStorage.setItem('mytoken', token)
          return true
        }
        return false
      })
    },
    async login({ commit }, userInfo) {
      const { token } = await us.login(userInfo)
      // code,token,data
      if (token) {
        // 登陆成功
        commit('setLoginState', true)
        localStorage.setItem('mytoken', token)
        return true
      }
      return false
    }
  }
})

export default user