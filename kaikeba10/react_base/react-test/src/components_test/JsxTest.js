import React, { Component } from 'react'

export default class JsxTest extends Component {
    render() {
        const name = "raven"
        return (
            <div>
                <h2>{name}</h2>
                <Welcome1 name="tom" />
                <Welcome2 name="jerry" />
                <Clock />
            </div>
        )
    }
}

function Welcome1(props) {
    return <div>welcome1, {props.name}</div>
}

class Welcome2 extends Component {
    render() {
        return <div>welcome2, {this.props.name}</div>
    }
}

class Clock extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         date: new Date()
    //     }
    // }
    state = {
        date: new Date(), counter: 1,
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000);
        // 批量操作，对用一个key多次操作会合并，只执行最后一次
        this.setState({ counter: this.state.counter + 1 })
        this.setState({ counter: this.state.counter + 1 })
        this.setState({ counter: this.state.counter + 1 })
        console.log(this.state.counter); // 1，可能是异步的     
        /**
         * setState：用来修改组件状态
         * setState({a: b})
         * setState(callback)
         */
    }
    componentWillMount() {
        clearInterval(this.timer)
    }
    render() {
        return <div>
            北京时间, {this.state.date.toLocaleTimeString()}, {this.state.counter}
        </div>
    }
}