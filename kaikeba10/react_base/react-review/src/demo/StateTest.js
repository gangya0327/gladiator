import React, { Component } from "react";

class Clock extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       date: new Date(),
  //     };
  //   }
  state = { date: new Date(), counter: 0 };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 });
    console.log(this.state.counter);
    /**
     * setState
     * 批量执行，多key一次执行，相同key合并
     * 可能是异步的，获取最新值的方法
     * 1）setState(cb)
     * 2）定时器：执行顺序
     * 3）原生事件：跳过了react机制
     */
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

export default class StateTest extends Component {
  render() {
    return (
      <div>
        <Clock></Clock>
      </div>
    );
  }
}
