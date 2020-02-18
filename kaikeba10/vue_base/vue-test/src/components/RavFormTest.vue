<template>
  <div>
    <h3>RavFormTest表单</h3>
    <hr />
    <!-- <rav-input :value="model.username" @input="model.username=$event"></rav-input> -->
    <rav-form :model="model" :rules="rules" ref="ravForm">
      <rav-form-item label="用户名" prop="username">
        <rav-input v-model="model.username"></rav-input>
      </rav-form-item>
      <rav-form-item label="密码" prop="password">
        <rav-input type="password" v-model="model.password"></rav-input>
      </rav-form-item>
      <rav-form-item>
        <el-button type="primary" @click="submitForm('ravForm')">提交</el-button>
      </rav-form-item>
    </rav-form>
  </div>
</template>

<script>
import RavInput from './RavInput'
import RavFormItem from './RavFormItem'
import RavForm from './RavForm'
export default {
  name: "RavFormTest",
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    }
  },
  components: {
    RavInput,
    RavFormItem,
    RavForm
  },
  methods: {
    submitForm(form) {
      // 表单全局校验
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log('success');
        } else {
          console.log('fail');
        }
      })
    }
  },
}
</script>

<style scoped>
</style>