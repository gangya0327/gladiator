<template>
  <div>
    <!-- 自定义组件要实现v-model必须实现:value和@input -->
    <!-- $attr存储的是props之外的部分 -->
    <input :value="value" v-bind="$attrs" @input="onInput">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit('input', e.target.value)
      // 通知FormItem进行校验
      this.$parent.$emit('validate')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
