<template>
  <div>
    <h1>Detail</h1>
    <p>{{$route.params.id}}</p>
    <p>{{id}}</p>
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>

<style lang="scss" scoped>
</style>