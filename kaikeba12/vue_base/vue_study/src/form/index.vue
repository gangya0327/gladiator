<template>
  <div>
    <k-form ref="loginForm" :rules="rules" :model="model">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" />
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" type="password" />
      </k-form-item>
      <k-form-item>
        <button @click="onLogin">登陆</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KInput from './KInput'
import KFormItem from './KFormItem'
import KForm from './KForm'
import Notice from '../notice'
import create from '@/utils/create'

export default {
  components: {
    KInput, KFormItem, KForm,
  },
  inheritAttrs: false, // 阻止顶层元素继承
  data() {
    return {
      model: {
        username: 'jack',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
      }
    }
  },
  methods: {
    onLogin() {
      // 创建弹窗实例
      let notice
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          // alert('login success')
          notice = create(Notice, {
            title: 'xxx',
            message: 'login success',
            duration: 3000
          })
        } else {
          // alert('error')
          notice = create(Notice, {
            title: 'xxx',
            message: 'error',
            duration: 3000
          })
        }
        notice.show()
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
