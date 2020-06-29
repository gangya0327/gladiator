<template>
  <div class="hello">
    <p :title="title" v-if="title">{{title}}</p>
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
    <cart />
    <cart title="abc cart" ref="cart" @addCartSuccess="addCartSuccess" />
  </div>
</template>

<script>
import Cart from './Cart'
export default {
  name: 'HelloWorld',
  components: {
    Cart
  },
  data() {
    return {
      title: '',
      text: '',
      goods: [
        { id: 1, text: 'java', price: 122 },
        { id: 2, text: 'html5', price: 79 },
        { id: 3, text: 'vue', price: 288 }
      ],
      cart: []
    }
  },
  created() {
    setTimeout(() => {
      this.title = 'welcome to vue'
    }, 1000);
  },
  methods: {
    addGood() {
      if (this.text) {
        this.goods.push({
          id: this.goods.length + 1,
          text: this.text,
          price: 34
        })
        this.text = ''
      }
    },
    addCart(good) {
      // this.$refs.cart.addCart(good)
      this.$buss.$emit('addCart', good)
    },
    addCartSuccess() {
      console.log('addCartSuccess')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
