import React from "react";

function Dialog(props) {
  const color = props.color || "red";
  return (
    <div style={{ border: `2px solid ${color}` }}>
      {/* 匿名插槽 */}
      {props.children}
      {/* 具名插槽 */}
      {props.footer}
      {/* 向外传递内容，调用函数 */}
      {props.foo("我是dialog传递出来的内容")}
    </div>
  );
}

function Welcome() {
  const footer = <button onClick={() => alert(123)}>确定</button>;
  return (
    <Dialog color="green" footer={footer} foo={c => <p>{c}</p>}>
      <h1>欢迎光临</h1>
    </Dialog>
  );
}

function FilterP(props) {
  return (
    <div>
      {React.Children.map(props.children, child => {
        console.log(child);
        if (child.type !== "p") {
          return;
        }
        return child;
      })}
    </div>
  );
}

function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { name: props.name })
      )}
    </div>
  );
}
function Radio(props) {
  return (
    <label>
      <input type="radio" name={props.name} />
      {props.children}
    </label>
  );
}

export default function Composition() {
  return (
    <>
      <Welcome></Welcome>
      <FilterP>
        <h1>bar</h1>
        <p>foo</p>
        <h2>kevin</h2>
        <p>mark</p>
      </FilterP>
      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="angular">angular</Radio>
      </RadioGroup>
    </>
  );
}
