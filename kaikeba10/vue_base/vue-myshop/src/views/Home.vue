<template>
  <div class="home">
    <!-- 轮播图 -->
    <cube-slide ref="slide" :data="slider" :interval="5000">
      <cube-slide-item v-for="(item, index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="slider" alt />
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <!-- <good-list :data="goods" @cartanim="$refs.ca.start($event)"></good-list> -->
    <good-list :data="goods" @cartanim="startCartAnim"></good-list>

    <!-- 动画组件 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
  </div>
</template>

<script>
// @ is an alias to /src
import gs from '../services/goods'
import GoodList from '../components/GoodList'
// import CartAnim from '@/components/CartAnim'

export default {
  name: 'Home',
  components: {
    GoodList,
    // CartAnim
  },
  data() {
    return {
      goodsInfo: {},
      keys: [],
      slider: []
    }
  },
  created() {
    gs.getGoodsInfo().then(data => {
      if (data) {
        const { goodsInfo, slider, keys } = data
        this.goodsInfo = goodsInfo
        this.slider = slider
        this.keys = keys
      }
    })
  },
  computed: {
    goods() {
      return this.keys.flatMap(key => this.goodsInfo[key])
    }
  },
  methods: {
    startCartAnim(el) {
      const anim = this.$createCartAnim({
        onTransitionend() {
          anim.remove()
        }
      })
      anim.start(el)
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
