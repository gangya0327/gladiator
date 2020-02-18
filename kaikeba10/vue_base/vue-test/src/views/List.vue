<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
          <button @click.prevent.stop="addCart(good)">加入购物车</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
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
    addCart() {
      console.log("add");
    }
  },
}
</script>

<style scoped>
</style>