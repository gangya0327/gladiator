import React, { Component, PureComponent } from "react";

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          { text: "react is good", user: "jack" },
          { text: "vuet is good", user: "kevin" }
        ]
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          // <Comment key={i}></Comment>
          <Comment key={i} {...c}></Comment>
        ))}
      </div>
    );
  }
}

// function Comment({ data }) {
//   console.log("render...");
//   return (
//     <div>
//       <p>{data.text}</p>
//       ---
//       <p>{data.user}</p>
//     </div>
//   );
// }

class Comment extends PureComponent {
  // shouldComponentUpdate(props) {
  //   console.log("props", props);
  //   console.log("this.props", this.props);
  //   if (
  //     props.data.text === this.props.data.text &&
  //     props.data.user === this.props.data.user
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  render() {
    console.log("render...");
    const { text, user } = this.props;
    return (
      <div>
        <p>{text}</p>
        ---
        <p>{user}</p>
      </div>
    );
  }
}
