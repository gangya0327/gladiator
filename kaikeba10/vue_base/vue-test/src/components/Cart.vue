<template>
  <table border="1">
    <thead>
      <tr>
        <th></th>
        <th>课程名</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in cart" :key="c.id" :class="{inactive: !c.active}">
        <td>
          <input type="checkbox" v-model="c.active" />
        </td>
        <td>{{c.text}}</td>
        <td>{{c.price}}</td>
        <td>{{c.count}}</td>
        <td>￥{{c.count*c.price}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" align="right">总计：</td>
        <td>￥{{total}}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || []
    }
  },
  created() {
    this.$bus.$on("addCart", good => this.addCart(good))
  },
  computed: {
    total() {
      return this.cart.reduce((sum, c) => {
        if (c.active) {
          sum += c.price * c.count
        }
        return sum
      }, 0)
    }
  },
  methods: {
    addCart(good) {
      const ret = this.cart.find(v => v.id === good.id)
      if (ret) {
        ret.count += 1
      } else {
        this.cart.push({ ...good, count: 1, active: true })
      }
      this.$emit("addCart")
    }
  },
  // watch: {
  //   cart(newVal) {
  //     localStorage.setItem("cart", JSON.stringify(newVal))
  //   }
  // }
  watch: {
    cart: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("cart", JSON.stringify(newVal))
      }
    }
  }
}
</script>

<style scoped>
.inactive {
  color: grey;
}
</style>