import React, { Component, PureComponent } from 'react'

export class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          { body: 'react is good', author: 'peter' },
          { body: 'vue is better', author: 'raven' },
        ]
      })
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} data={c} />
        ))}
        {this.state.comments.map((c, i) => (
          <CommentPureComponent key={i} {...c} />
        ))}
      </div>
    )
  }
}

function Comment({ data }) {
  console.log('render')
  return (
    <div>
      <p>{data.body}</p>
      <p>{data.author}</p>
    </div>
  )
}

class CommentPureComponent extends PureComponent {
  render() {
    console.log('PureComponent')
    const { body, author } = this.props
    return (
      <div>
        <p>{body}</p>
        <p>{author}</p>
      </div>
    )
  }
}

export default CommentList
