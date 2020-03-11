import React from 'react';
import './App.css';
// import JsxTest from './components_test/JsxTest'
// import CartSample from './components_test/CartSample'
// import Button from "antd/lib/button"
// import {Button} from 'antd'
import "antd/dist/antd.css"
import style from "./App.module.css"
// import CommentList from './components/CommentList'
import Hoc from './components/Hoc'
import Composition from './components/Composition'

function App() {
  return (
    <div className={style.img}>
      {/* <JsxTest /> */}
      {/* <CartSample /> */}
      {/* <Button type="primary">button</Button> */}
      {/* <CommentList></CommentList> */}
      <Hoc name="hoc"></Hoc>
      <Composition></Composition>
    </div>
  );
}

export default App;
