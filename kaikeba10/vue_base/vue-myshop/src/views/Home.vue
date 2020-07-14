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
    <good-list :data="goods"></good-list>
  </div>
</template>

<script>
// @ is an alias to /src
import gs from '../services/goods'
import GoodList from '../components/GoodList'

export default {
  name: 'Home',
  components: {
    GoodList
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
  }
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
