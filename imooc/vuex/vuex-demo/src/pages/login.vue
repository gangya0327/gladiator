<template>
  <div>
    账号
    <input type="text" v-model="form.username" />
    密码
    <input type="password" v-model="form.password" />
    <button @click="login">登陆</button>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if (!this.form.username || !this.form.password) {
        alert("请输入完整信息")
      } else {
        setTimeout(() => {
          store.commit('login', {
            username: this.form.username,
            password: this.form.password
          })
          store.commit('setMemberInfo', {
            userStatus: 1,
            vipLevel: 0
          })
          this.$router.push('/')
        }, 500);
      }

      // store.commit('login' )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>