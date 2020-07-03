<template>
  <div>
    <h1>用户登录</h1>
    <button @click="onLogin" :disabled="loading">{{loading?'登录中...':'登录'}}</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['alogin']),
    onLogin() {
      this.loading = true
      // window.isLogin = true
      // this.$store.commit('login')
      // this.$store.dispatch('alogin').then(isLogin => {
      //   console.log('isLogin', isLogin)
      //   const redirect = this.$route.query.redirect || '/'
      //   this.$router.push(redirect)
      // })
      // this.$store.dispatch('alogin')
      this.alogin({ username: 'tom' })
      setTimeout(() => {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
        this.loading = false
      }, 1000);
    }
  },
}
</script>

<style scoped>
</style>