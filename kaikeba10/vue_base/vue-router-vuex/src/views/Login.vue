<template>
  <div>
    <h1>用户登录</h1>
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogin() {
      window.isLogin = true
      const redirect = this.$route.query.redirect || '/'
      this.$router.push(redirect)
    }
  },
}
</script>

<style scoped>
</style>