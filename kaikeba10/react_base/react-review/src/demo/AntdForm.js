import React, { Component } from 'react'
import { Form, Icon, Button, Input } from 'antd'

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values)
      }
    })
  }
  render() {
    console.log('this.props.form', this.props.form)
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {/* 封装表单组件为可校验组件 */}
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(<Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25)' }}></Icon>}
            placeholder='username'
          ></Input>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(<Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }}></Icon>}
            placeholder='password'
          ></Input>)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>login</Button>
        </Form.Item>
      </Form>
    )
  }
}
// WrapperedNormalLoginForm
const WrapperedNormalLoginForm = Form.create({ name: 'NormalLoginForm' })(NormalLoginForm)
export default WrapperedNormalLoginForm
