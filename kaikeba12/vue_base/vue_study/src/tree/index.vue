<template>
  <div>
    <ul>
      <Item class="item" :model="treeData" />
    </ul>
  </div>
</template>

<script>
import Item from './item'

export default {
  components: {
    Item,
  },
  data() {
    return {
      treeData: {
        title: 'web全栈架构师',
        children: [{
          title: 'Java架构师',
          children: [{
            title: 'Spring开发'
          }, {
            title: 'Sql管理'
          }]
        }, {
          title: '前端开发',
          children: [{
            title: '移动端',
            children: [{
              title: '微信小程序'
            }, {
              title: 'HTML5页面'
            }, {
              title: 'ReactNative'
            }]
          }, {
            title: 'Vue开发'
          }, {
            title: 'Angular开发'
          }, {
            title: 'Bootstrap'
          }]
        }]
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
