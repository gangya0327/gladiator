<template>
  <div>
    <hello-child ref="world" msg="你好啊" @foo="onFoo($event)" />
    <hr>
    <hello-child>
      <!-- 匿名插槽 -->
      <template v-slot:default>i am slot words</template>
      <!-- 具名插槽 -->
      <template v-slot:abc>i am named slot words</template>
      <!-- 作用域插槽 -->
      <template v-slot:abcd="bal">{{ bal.bla }}</template>
    </hello-child>
  </div>
</template>

<script>
import HelloChild from './HelloChild'
export default {
  components: {
    HelloChild
  },
  // provide: {
  //   grand: 'grand'
  // },
  provide() {
    return {
      grand: 'grand'
    }
  },
  // 父组件先于子组件创建
  mounted() {
    console.log(this.$refs.world.text)
    this.$refs.world.text = 'peter'
    this.$children[0].text = 'raven' // 子元素不保证顺序
  },
  methods: {
    onFoo(val) {
      console.log('on foo', val)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
