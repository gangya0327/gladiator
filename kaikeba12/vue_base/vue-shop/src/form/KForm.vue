<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this // 传递Form实例给子代
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: null
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item => item.prop) // 过滤
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
