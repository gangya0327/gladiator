<template>
  <div>
    <div class="goods" v-for="(item,index) in cart" :key="index">
      <span>{{item.title}}</span>
      <div class="right">
        <i class="cubeic-remove" @click="removeCart(index)"></i>
        <span>{{item.cartCount}}</span>
        <i class="cubeic-add" @click="addCart(index)"></i>
      </div>
    </div>
    <div>总价：{{total}}</div>

    <cube-button :disabled="true" v-if="total<minTotal">还差{{minTotal-total}}可以购买</cube-button>
    <cube-button v-else>
      下单
      <span v-if="!isLogin">(需要登录)</span>
    </cube-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      minTotal: 100
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.list,
      isLogin: state => state.user.isLogin
    }),
    ...mapGetters({
      total: 'total'
    })
  }
}
</script>

<style lang="stylus" scoped>
.good {
  padding: 10px;
  text-align: left;

  .right {
    float: right;
  }

  i {
    font-size: 18px;
  }
}
</style>
