import React, { Component } from "react";

export default class LifeCycle extends Component {
  constructor(props) {
    super(props);
    console.log("1 组件构造函数执行，常用于初始化状态");
  }
  componentWillMount() {
    console.log("2 组件即将挂载，此时可以访问状态和属性");
  }
  componentDidMount() {
    console.log("3 组件已挂载，可进行接口调用");
  }
  componentWillReceiveProps() {
    console.log("4 将要接受参数传递，父组件传递的属性有变化");
  }
  shouldComponentUpdate(prevProps, prevState) {
    console.log("5 组件是否要更新");
  }
  componentWillUpdate() {
    console.log("6 组件即将更新");
  }
  componentDidUpdate() {
    console.log("7 组件已经更新");
  }
  componentWillUnmount() {
    console.log("8 组件即将卸载");
  }
  /**
   * react16以后使用fiber架构，变成异步渲染，render在初始化时就可能多次执行
   * componentWillMount，componentWillUpdate将被
   * getDrivedStateFromProps(16.3只覆盖父组件传值改变，16.4后全覆盖)，getSnapshotBeforeUpdate取代
   */

  render() {
    return <div></div>;
  }
}
