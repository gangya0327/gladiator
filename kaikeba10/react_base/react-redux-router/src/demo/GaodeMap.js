import React, { Component } from 'react'

export class GaodeMap extends Component {
  componentDidMount() {
    (function () {
      var iframe = document.getElementById('test').contentWindow;
      console.log(1, iframe)
      setTimeout(() => {
        iframe.postMessage('hello', "https://m.amap.com/picker/?kzoom=15&center=120.181281,30.293007&radius=1000&total=20&key=7a2365e3f2fb1a7823aeb3f6fbb98551");
      }, 1000);
      document.getElementById('test').onload = function () {
        console.log(2)
      };
      // window.addEventListener("message", function (e) {
      //   alert('您选择了:' + e.data.name + ',' + e.data.location)
      // }, false);
    }())
  }
  render() {
    return (
      <div>
        <iframe id="test" title='test'></iframe>
      </div>
    )
  }
}

export default GaodeMap
