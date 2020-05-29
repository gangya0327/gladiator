<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
          <button @click.prevent.stop="addCart(good)">加入购物车</button>
        </router-link>
        <button @click="abc()">click</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      goods: [{
        id: 1,
        text: "洗衣机",
        price: 1599
      }, {
        id: 2,
        text: "电冰箱",
        price: 2368
      }, {
        id: 3,
        text: "电视机",
        price: 3899
      }]
    }
  },
  methods: {
    ...mapMutations(["show", "addCartStore"]),
    addCart(good) {
      console.log("add", good);
      this.show()
      this.addCartStore(good)
    },
    abc() {
      console.log(4114)
    }
  },
}
</script>

<style scoped>
</style>