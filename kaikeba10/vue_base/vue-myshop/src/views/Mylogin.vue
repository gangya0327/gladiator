<template>
  <div>
    <h4>用户登录</h4>
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
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              required: true,
            },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: { open: true }
            },
            rules: {
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '提交'
          }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('login', this.model).then(res => {
        if (res) {
          const path = this.$route.query.redirect || '/'
          this.$router.push(path)
        }
      }).catch(() => {
        this.$createToast({
          time: 2000,
          type: 'error',
          txt: '登陆失败'
        }).show()
      })
    },
    handleValidate() {

    }
  },
}
</script>

<style lang="scss" scoped>
</style>