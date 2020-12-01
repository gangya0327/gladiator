<template>
  <div>
    <h3>vuex test</h3>
    <p>count: {{ $store.state.count }}</p>
    <p>{{ $store.getters['score'] }}</p>
    <button @click="add">add</button> &nbsp;
    <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit('add', 3)
      // this.$store.state.count += 1
    },
    asyncAdd() {
      this.$store.dispatch('asyncAdd').then(res => {
        console.log('res', res)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
