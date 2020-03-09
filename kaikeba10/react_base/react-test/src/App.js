import React from 'react';
import './App.css';
// import JsxTest from './components_test/JsxTest'
// import CartSample from './components_test/CartSample'
// import Button from "antd/lib/button"
import {Button} from 'antd'
import "antd/dist/antd.css"
import style from "./App.module.css"

function App() {
  return (
    <div className={style.img}>
      {/* <JsxTest /> */}
      {/* <CartSample /> */}
      <Button type="primary">button</Button>
    </div>
  );
}

export default App;
