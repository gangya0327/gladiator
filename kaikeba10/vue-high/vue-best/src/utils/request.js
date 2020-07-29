import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域时若要发送cookies需要设置
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5000
      })
      if (res.code === 1008 || res.code === 10012) {
        MessageBox.confirm('登陆状态异常，请重新登陆', '确认登陆信息', {
          confirmButtonTest: '重新登陆',
          cancelButtonTest: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service