import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

// 存储用户令牌和用户信息
const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username } = userInfo
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === 'admin' || username === 'jerry') {
    //       // 保存状态信息
    //       commit("SET_TOKEN", username)
    //       // 写入cookie
    //       setToken(username)
    //       resolve()
    //     } else {
    //       reject('用户名，密码错误')
    //     }
    //   }, 1000);
    // })
    return login(userInfo).then(res => {
      commit("SET_TOKEN", res.data)
      setToken(res.data)
    })
  },
  // get user info
  getInfo({ commit, state }) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const roles = state.token === 'admin' ? ['admin'] : ['editor']
    //     commit("SET_ROLES", roles)
    //     resolve({ roles })
    //   }, 1000);
    // })
    return getInfo(state.token).then(({ data: roles }) => {
      commit("SET_ROLES", roles)
      return { roles }
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", '')
      commit("SET_ROLES", [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}