<template>
  <div>
    <h2>用户登录</h2>
    <button @click="onLogin" :disabled="loading">{{this.loading?"正在登录":"登录"}}</button>
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
    ...mapActions(['requestLogin']),
    onLogin() {
      // console.log("登录成功");
      // window.isLogin = true

      // 提交mutatuions
      // this.$store.commit("login") 
      // 提交actions
      this.loading = true
      this.requestLogin({ username: "tom" }).then(isLogin => {
        if (isLogin) {
          // 获取查询参数
          const redirect = this.$route.query.redirect || "/"
          // 路由到重定向地址
          this.$router.push(redirect)
        }
      })
    }
  },
}
</script>

<style scoped>
</style> 