<template>
  <div>
    <h3>商品详情</h3>
    <p>{{$route.params}}</p>
    <p>{{id}}</p>
    <p>{{detailId}}</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      detailId: 0
    }
  },
  created() {
    console.log(this.id);
    this.detailId = this.id
  }
}
</script>

<style scoped>
</style>