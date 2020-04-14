import React, { Component } from "react";

function Welcome1(props) {
  return <div>welcome1,{props.name}</div>;
}

class Welcome2 extends Component {
  render() {
    return <div>welcome2,{this.props.name}</div>;
  }
}

function ComType() {
  return (
    <div>
      <Welcome1 name="jack"></Welcome1>
      <Welcome2 name="mark"></Welcome2>
    </div>
  );
}

export default ComType;
