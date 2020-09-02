<template>
  <li>
    <div @click="toggle">
      <!-- 标题 -->
      {{ model.title }}
      <!-- 是否有子元素 -->
      <span v-if="isFolder">[{{ open?'-':'+' }}]</span>
    </div>
    <!-- 是否有子树 -->
    <ul v-show="open" v-if="isFolder">
      <Item v-for="m in model.children" :key="m.title" class="item" :model="m" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: {
    model: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
