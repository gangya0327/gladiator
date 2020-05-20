<template>
  <div>
    <div>欢迎你，{{this.$store.getters.memberInfo}}</div>
    <div>欢迎你，{{memberInfo}}</div>
    <div>用户等级：{{vipLevel}}</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters(['memberInfo']),
    ...mapState(['userStatus','vipLevel'])
  }
}
</script>

<style lang="scss" scoped>
</style>