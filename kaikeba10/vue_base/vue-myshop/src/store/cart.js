export default {
  state: {
    list: JSON.parse(localStorage.getItem('cart')) || []
  },
  getters: {
    cartTotal: state => {
      let num = 0
      state.list.forEach(v => {
        num += v.cartCount
      })
      return num
    },
    total: state => {
      // let total = 0
      // state.list.forEach(v => {
      //   total += v.cartCount * v.price
      // })
      // return total
      return state.list.reduce((total, v) => total + v.cartCount * v.price, 0)
    }
  },
  mutations: {
    addcart(state, item) {
      const good = state.list.find(v => v.title === item.title)
      if (good) {
        good.cartCount += 1
      } else {
        state.list.push({
          ...item,
          cartCount: 1
        })
      }
    },
    cartremove(state, index) {
      if (state.list[index].cartCount > 1) {
        state.list[index].cartCount -= 1
      }
    },
    cartadd(state, index) {
      state.list[index].cartCount += 1
    }
  },
  actions: {}
}