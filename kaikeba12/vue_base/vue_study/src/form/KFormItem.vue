<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <slot />
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    // 监听校验事件并执行监听
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 执行组件校验
      // 1 获取校验规则
      const rules = this.form.rules[this.prop]
      // 2 获取数据
      const value = this.form.model[this.prop]
      // 3 执行校验
      const desc = {
        [this.prop]: rules
      }
      const schema = new Schema(desc)
      // 参数1 是值
      // 返回 Promise<boolean>
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMessage = errors[0].message
        } else {
          this.errorMessage = ''
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
