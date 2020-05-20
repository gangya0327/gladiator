import React from "react";
import JsxTest from "./demo/JsxTest";
import ComType from "./demo/ComType";
import StateTest from "./demo/StateTest";
import CartSample from "./demo/CartSample";
import Container from './demo/Container'
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'
import { Button } from 'antd'
import "./App.css";
import CommentList from './demo/CommentList'
import style from './App.module.css'

function App() {
  return (
    <div className={style.border}>
      <JsxTest></JsxTest>
      <ComType></ComType>
      <StateTest></StateTest>
      <CartSample></CartSample>
      <Button type='primary'>but</Button>
      <Container></Container>
      <CommentList></CommentList>
    </div>
  );
}

export default App;
