import React, { Component } from 'react'

// function Inside(props) {
//   return (
//     <div>
//       {props.stage} - {props.name}
//     </div>
//   )
// }

@withLog
@widthState
@withLog
class Inside extends Component {
  render() {
    return (<div>
      {this.props.stage} - {this.props.name}
    </div>)
  }
}

// 创建一个函数，接受一个组件，返回另一个组件
function widthState(Component) {
  const newComponent = props => {
    return <Component {...props} name='react' />
  }
  return newComponent
}

function withLog(Component) {
  console.log(Component.name + " is running")
  return props => {
    return <Component {...props} />
  }
}

// export default withLog(widthState(withLog(Inside)))
export default widthState(Inside)
