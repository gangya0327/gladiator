<template>
  <div>
    <p :title="title">{{title}}</p>
    <div>
      <input type="text" v-model="text" />
      <button @click="addGood">添加商品</button>
    </div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addCart(good)">加入购物车</button>
      </li>
    </ul>
    <cart ref="cart" @addCart="onAddCart"></cart>
  </div>
</template>
 
<script>
import Cart from './Cart'
export default {
  name: 'HelloWorld',
  components: { Cart },
  data() {
    return {
      title: 'vue-test',
      text: 'aaa',
      goods: [
        {
          id: 1,
          text: 'web',
          price: 879
        },
        {
          id: 2,
          text: '全栈',
          price: 1350
        },
        {
          id: 3,
          text: 'html5',
          price: 668
        }
      ],
      cart: []
    }
  },
  methods: {
    addGood() {
      if (this.text) {
        this.goods.push({
          id: this.goods.length + 1,
          text: this.text,
          price: 779
        })
      }
    },
    addCart(good) {
      // this.$refs.cart.addCart(good)
      this.$bus.$emit("addCart", good)
    },
    onAddCart() {
      console.log("add success");
    }
  }
}
</script>

<style scoped>
</style>
