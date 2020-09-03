let Vue

class VueRouter {
  constructor(options) {
    console.log('options', options)
    this.$options = options
    // 创建一个路由path和route映射
    this.routeMap = {}
    // 当前路径需要响应式，利用vue的响应式原理
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    // 绑定浏览器事件
    this.bindEvents()
    // 解析路由配置
    this.createRouteMap(this.$options)
    // 创建router-link和router-view
    this.initComponent()
  }
  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }
  onHashChange(e) {
    console.log('e', e)
    // http://localhost/#/home
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      // ['/home']:{path: '/home', component: Home}
      this.routeMap[item.path] = item
    })
  }
  initComponent() {
    // 声明两个全局组件
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          default: ''
        },
      },
      render(h) {
        // 目标是<a :href='to'>xxx</a>
        return h('a', {
          attrs: { href: '#' + this.to }
        }, this.$slots.default)
        // return <a href={this.to}>{this.$slots.default}</a>
      }
    })
    // hash->current->render
    Vue.component('router-view', {
      // 箭头函数，保留this指向，VueRouter实例
      render: (h) => {
        const Comp = this.routeMap[this.app.current].component
        return h(Comp)
      }
    })
  }
}

// 把VueRouter变为插件
VueRouter.install = function(_Vue) {
  // 保存，供上面使用
  Vue = _Vue
  // 混入任务
  Vue.mixin({
    beforeCreate() {
      // 这里的代码将来会在外面初始化时被调用，实习对vue的扩展
      // 但这里只希望根组件执行一次
      if (this.$options.router) {
        // this是vue组件实例
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}

export default VueRouter
