<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    // provide 返回对象可以跨层级传参给子孙
    return {
      form: this // 将表单实例传递给后代
    }
  },
  props: {
    model: { type: Object, required: true },
    rules: { type: Object }
  },
  methods: {
    async validate(cb) {
      // 执行表单中的所有校验
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      // tasks中任意错误则校验失败
      const results = await Promise.all(tasks)
      if (results.some(valid => !valid)) {
        cb(false)
      } else {
        cb(true)
      }
    }
  },

}
</script>

<style scoped>
</style>