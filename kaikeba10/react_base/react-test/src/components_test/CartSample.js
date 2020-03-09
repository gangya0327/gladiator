import React, { Component } from 'react'

function Cart(props) {
    return (
        <table>
            <tbody>
                {
                    props.data.map(d => (
                        <tr key={d.text} onClick={props.onSelect(d.text)}>
                            <td>{d.text}</td>
                            <td>{d.id}</td>
                            <td>￥{d.price * d.count}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default class CartSample extends Component {
    state = {
        goods: [
            { text: "javascript", price: 199, id: 1 },
            { text: "shark", price: 79, id: 2 },
            { text: "python", price: 329, id: 3 },
        ],
        name: "",
        title: "",
        cart: []
    }
    handleChange(e) {
        this.setState({ name: e.target.value })
    }
    addGood = () => {
        this.setState({
            goods: [...this.state.goods,
            { text: this.state.name, price: 39 }]
        })
    }
    addCart(good) {
        const item = this.state.cart.find(c => c.text === good.text)
        if (item) {
            item.count += 1
            this.setState({ cart: [...this.state.cart] }, console.log(this.state.cart))
        } else {
            this.setState(
                { cart: [...this.state.cart, { ...good, count: 1 }] },
                console.log(this.state.cart)
            )
        }
    }
    onSelect(name) {
        console.log(name)
    }
    render() {
        const goods = this.state.goods.map(good => (
            <li key={good.text}>{good.text}
                <button onClick={() => { this.addCart(good) }}>加入购物车</button></li>
        ))
        setTimeout(() => {
            this.setState({ title: "react 购物车" })
        }, 1000);
        return (
            <div>
                <ul>{this.state.goods.map(good => <li key={good.text}>{good.text}</li>)}</ul>
                <hr />
                {this.state.title && <h1>{this.state.title}</h1>}
                <ul>{goods}</ul>
                <input type="text" value={this.state.name}
                    onChange={e => this.handleChange(e)} />
                <button onClick={e => this.addGood()}>添加</button>
                <hr />
                <Cart data={this.state.cart} onSelect={this.onSelect}/>
            </div>
        )
    }
}
