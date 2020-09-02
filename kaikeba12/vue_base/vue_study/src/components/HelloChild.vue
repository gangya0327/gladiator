<template>
  <div @click="$parent.$emit('bi')">
    <span @click="$emit('foo','abc')">{{ msg || 'hello' }}, {{ text }}</span> |
    <span>{{ grand }}</span>
    <p>匿名插槽：<slot /></p>
    <p>具名插槽：<slot name="abc" /></p>
    <p>作用域插槽：<slot name="abcd" bla="blaText" /></p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    },
  },
  inject: ['grand'],
  data() {
    return {
      text: '世界'
    }
  },
  created() {
    this.$parent.$on('bi', () => {
      console.log('bibibi')
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
