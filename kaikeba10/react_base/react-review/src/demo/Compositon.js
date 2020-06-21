import React, { Component } from 'react'

function Dialog(props) {
  const color = props.color || 'blue'
  return <div style={{ border: `1px solid ${color}` }}>
    {/* 匿名插槽 */}
    {props.children}
    <div>
      {props.foo('这是dialog传进来的')}
    </div>
    <div>
      {/* 具名插槽 */}
      {props.footer}
    </div>
  </div>
}

function WithDailog() {
  const footer = <button onClick={() => alert('confirm')}>确定</button>
  return (
    <div>
      <Dialog color='red' footer={footer} foo={(c) => <p>{c}</p>}>
        <h1>欢迎使用</h1>
        <p>Composition!!</p>
      </Dialog>
    </div>
  )
}

function FilterP(props) {
  return (
    <div>
      {
        React.Children.map(props.children, child => {
          console.log('child', child)
          if (child.type !== 'p') {
            return
          }
          return child
        })
      }
    </div>
  )
}

function RadioGroup(props) {
  // 将name属性赋值给所有radio
  return (
    <div>{React.Children.map(props.children, child => React.cloneElement(child, { name: props.name }))}</div>
  )
}
function Radio(props) {
  return (
    <label>
      <input type="radio" name={props.name} />
      {props.children}
    </label>
  )
}

export class Compositon extends Component {
  render() {
    return <>
      <WithDailog />
      <FilterP>
        <h1>fff</h1>
        <p>bar</p>
        <h3>hello</h3>
        <p>peter</p>
      </FilterP>
      <RadioGroup name='mvvm'>
        <Radio value='vue'>vue</Radio>
        <Radio value='react'>react</Radio>
        <Radio value='angular'>angular</Radio>
      </RadioGroup>
    </>
  }
}

export default Compositon
