<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @submit.prevent="handleLogin"
      @validate="handleValidate"
    ></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: { placeholder: '请输入用户名' },
            rules: { required: true },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: { placeholder: '请输入密码', type: 'password', eye: { open: true } },
            rules: { required: true },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '登陆'
          }
        ]
      }
    }
  },
  methods: {
    handleValidate(ret) {
      console.log(ret)
    },
    handleLogin() {
      // 登陆请求
      this.$store.dispatch('login', this.model).then(success => {
        if (success) {
          const path = this.$route.query.redirect || '/'
          this.$router.push(path)
        }
      }).catch(() => {
        this.$createToast({
          time: 2000,
          txt: '登陆失败',
          type: 'error'
        }).show()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>