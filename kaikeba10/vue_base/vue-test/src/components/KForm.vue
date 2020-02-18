<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // provide返回的对象可以跨层传参给子孙
  provide() {
    return {
      form: this // 将表单的实例传递给后代
    }
  },
  props: {
    model: { type: Object, required: true },
    rules: { type: Object }
  },
  methods: {
    async validate(callback) {
      // 执行所有表单中所有表单项校验
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      // tasks中任意存在false则校验失败
      const results = await Promise.all(tasks)
      if (results.some(valid => !valid)) {
        // 校验失败
        callback(false)
      } else {
        callback(true)
      }
    }
  },
}
</script>

<style scoped>
</style>