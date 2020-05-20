import React, { Component } from "react";

function Cart(props) {
  return (
    <table>
      <tbody>
        {props.data.map((d) => (
          <tr key={d.text} onClick={() => props.onSelect(d.text)}>
            <td>{d.id}</td>
            <td>{d.text}</td>
            <td>{d.count}</td>
            <td>￥{d.count * d.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      goods: [
        { text: "java后端开发", price: 98, id: 1 },
        { text: "php后端开发", price: 156, id: 2 },
        { text: "react前端开发", price: 248, id: 3 },
      ],
      name: "",
      cart: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ title: "简易react购物" });
    }, 1000);
  }
  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };
  addGood = (e) => {
    this.setState({
      goods: [...this.state.goods, { text: this.state.name, price: 166 }],
    });
  };
  addCart(good) {
    const item = this.state.cart.find((c) => c.text === good.text);
    if (item) {
      item.count += 1;
      this.setState({ cart: [...this.state.cart] });
    } else {
      this.setState({ cart: [...this.state.cart, { ...good, count: 1 }] });
    }
  }
  onSelect = (text) => {
    console.log(text);
  };
  render() {
    const good = this.state.goods.map((good) => (
      <li key={good.text}>
        {good.text}
        <button onClick={() => this.addCart(good)}>加入购物车</button>
      </li>
    ));
    return (
      <div>
        {this.state.title && <h1>{this.state.title}</h1>}
        <ul>{good}</ul>
        <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.handleChange(e)}
        />
        <button onClick={(e) => this.addGood(e)}>添加</button>
      </div>
    );
  }
}

export default CartSample;
