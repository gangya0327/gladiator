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
import Hoc from './demo/Hoc'
import Compositon from './demo/Compositon'
import HookTest from './demo/HookTest'
import HookTest2 from './demo/HookTest2'
import AntdForm from './demo/AntdForm'
import KFormTest from './demo/KFormTest'

function App() {
  return (
    <div className={style.border}>
      <KFormTest />
      <AntdForm />
      <HookTest2 />
      <HookTest />
      <Compositon />
      <Hoc stage='hoc' />
      <CommentList></CommentList>
      <Container></Container>
      <Button type='primary'>but</Button>
      <CartSample></CartSample>
      <StateTest></StateTest>
      <ComType></ComType>
      <JsxTest></JsxTest>
    </div>
  );
}

export default App;
