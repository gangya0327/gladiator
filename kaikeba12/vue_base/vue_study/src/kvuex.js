// 1 维护状态
// 2 修改状态commit
// 3 业务逻辑控制dispatch
// 4 状态派发getter
// 5 实现state响应式
// 6 插件
// 7 混入

let Vue

function install(_Vue, storeName = '$store') {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype[storeName] = this.$options.store
      }
    }
  })
}

class Store {
  // options: {state: {count: 0}}
  constructor(options = {}) {
    // 利用vue响应式
    this.state = new Vue({
      data: options.state
    })
    // 初始化mutations
    this.mutations = options.mutations || {}
    this.actions = options.actions || {}
    options.getters && this.handleGetters(options.getters)
  }
  // 触发mutations，需要实现commit
  // this指向Store实例
  commit=(type, arg) => {
    // 获取变更函数
    const fn = this.mutations[type]
    fn(this.state, arg)
  }
  dispatch = (type, arg) => {
    const fn = this.actions[type]
    return fn({ commit: this.commit, state: this.state }, arg)
  }
  handleGetters(getters) {
    // Store实例上的getters
    this.getters = {}
    // 定义只读属性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
}

export default { Store, install }
