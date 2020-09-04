class Bus {
  emit() {}
  on() {}
}

Bus.install = function(Vue) {
  Vue.prototype.$bus = new Bus()
}
