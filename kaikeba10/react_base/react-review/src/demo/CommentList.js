import React, { Component } from 'react'

export class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        comments: [
          { body: 'react is good', author: 'peter' },
          { body: 'vue is better', author: 'raven' },
        ]
      })
    }, 500);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} data={c} />
        ))}
      </div> 
    )
  }
}

function Comment({ data }) {
  return (
    <div>
      <p>{data.body}</p>
      <p>{data.author}</p>
    </div>
  )
}

export default CommentList
