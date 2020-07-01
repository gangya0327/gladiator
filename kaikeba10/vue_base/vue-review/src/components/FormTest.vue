<template>
  <div>
    <h3>KForm表单</h3>
    <hr />
    <k-input :value="model.username" @input="model.username=$event"></k-input>
    <k-form :model="model" :rules="rules" ref="kForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username"></k-input>
        <template slot="bar">
          <p>bar content</p>
        </template>
        <template v-slot:foo>
          <p>foo content</p>
        </template>
        <template #mar>
          <p>mar content</p>
        </template>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" type="password"></k-input>
      </k-form-item>
      <k-form-item>
        <el-button type="primary" @click="submitForm('kForm')">提交</el-button>
      </k-form-item>
    </k-form>

    <h3>Element表单</h3>
    <hr />
    <el-form :model="model" :rules="rules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import KInput from './KInput'
import KFormItem from './KFormItem'
import KForm from './KForm'
export default {
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      model: { username: 'tom', password: '123' },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log('校验成功，请求登陆')
        } else {
          console.log('校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>