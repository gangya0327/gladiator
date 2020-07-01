<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // provide返回对象可以跨层级传参给子孙
  provide() {
    return {
      form: this // 表单实例
    }
  },
  props: {
    model: { type: Object, required: true },
    rules: { type: Object }
  },
  methods: {
    async validate(cb) {
      // 执行表单中所有表单项校验
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      console.log('tasks', tasks)
      // tasks中任意false则校验失败
      const results = await Promise.all(tasks)
      if (results.some(valid => !valid)) {
        cb(false)
      } else {
        cb(true)
      }
    }
  }
}
</script>

<style scoped>
</style>