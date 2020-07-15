<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <Button v-if="$store.state.user.isLogin" @click="logout">注销</Button>
    </div>-->
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <cube-tab v-for="(item,index) in tabs" :key="index" :icon="item.icon" :label="item.value">
        <div>{{item.label}}</div>
        <span class="badge" v-if="item.label==='Cart'">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectLabel: '/',
      tabs: [
        {
          label: 'Home',
          value: '/',
          icon: 'cubeic-home'
        },
        {
          label: 'Cart',
          value: '/cart',
          icon: 'cubeic-mall'
        },
        {
          label: 'Me',
          value: '/about',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  created() {
    // 初始化页面设置，避免页面刷新
    this.selectLabel = this.$route.path;
  },
  watch: {
    $route(route) {
      // 监听路由变化，动态设置页签选中状态
      this.selectLabel = route.path
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    changeHandler(val) {
      this.$router.push(val)
    }
  },
  computed: {
    ...mapGetters(
      ['cartTotal']
    )
  }
}
</script>

<style lang="stylus">
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #edf0f4;
}

.cube-tab-bar-slider {
  top: 0;
}

// 动画
.route-move-enter { // 入场前状态
  transform: translate3d(-100%, 0, 0);
}

.route-move-leave-to { // 离场后状态
  transform: translate3d(100%, 0, 0);
}

.route-move-enter-active, .route-move-leave-active { // 激活状态
  transition: transform 0.3s;
}

.child-view { // 添加到每个页面上的样式，确保页面间不挤占位置
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 40px;
}

.cube-tab {
  position: relative;
}

span.badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  min-width: 16px;
  min-height: 16px;
  position: absolute;
  right: 25%;
  top: 0;
}
</style>
