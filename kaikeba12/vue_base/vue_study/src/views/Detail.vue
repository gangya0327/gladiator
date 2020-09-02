<template>
  <div>
    Detail
    <p>
      $route.params.id: {{ $route.params.id }}
    </p>
    <p>
      props id: {{ id }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
