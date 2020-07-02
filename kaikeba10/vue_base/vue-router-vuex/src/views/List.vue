<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
          <button @click.prevent.stop="addCart">加入</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [
        { id: 1, text: 'java', price: 89 },
        { id: 2, text: 'php', price: 21 },
      ]
    }
  },
  methods: {
    addCart() {
      console.log('加入购物车了')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>