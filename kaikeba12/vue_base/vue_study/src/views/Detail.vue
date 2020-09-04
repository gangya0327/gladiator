<template>
  <div>
    Detail
    <p>
      $route.params.id: {{ $route.params.id }}
    </p>
    <p>
      props id: {{ id }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  watch: {
    $route: {
      handler() {
        console.log('watch this.$route', this.$route)
      },
      // 当值第一次绑定的时候，不会执行监听函数，
      // 只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
      // 比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，需要将immediate设为true
      immediate: true
    }
  },
  created() {
    console.log('created this.$route', this.$route)
  }
}
</script>

<style lang="scss" scoped>

</style>
