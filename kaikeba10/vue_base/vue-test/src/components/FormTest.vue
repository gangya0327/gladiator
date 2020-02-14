<template>
  <div>
    <h3>element表单</h3>
    <hr />
    <el-form :model="model" :rules="rules" ref="loginForm">
      <el-form-item label="用户名" props="username">
        <el-input v-model="model.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" props="password">
        <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$ref[form].validate(valid => {
        if (valid) {
          alert("请求登陆")
        } else {
          alert("校验失败")
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
