import React, { useState, useEffect } from "react";

function FruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return;
  }
}

function FruitList({ fruits, setFruit }) {
  return fruits.map(f => (
    <li key={f} onClick={() => setFruit(f)}>
      {f}
    </li>
  ));
}

function FruitAdd(props) {
  const [pname, setPname] = useState("");
  const onAddFruit = e => {
    if (e.key === "Enter") {
      props.onAddFruit(pname);
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  );
}

export default function HookTest() {
  const [fruit, setFruit] = useState("草莓");
  //   const [fruits, setFruits] = useState([]);
  const [fruits, dispatch] = useReduce(FruitReducer, []);

  useEffect(() => {
    console.log("setFruits");
    setTimeout(() => {
      setFruits(["草莓", "香蕉"]);
    }, 1000);
  }, []);

  useEffect(() => {
    document.title = fruit;
  }, [fruit]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("running");
    }, 1000);
    return clearInterval(timer);
  }, []);
  return (
    <div>
      <p>{fruit === "" ? "请选择喜爱的水果" : `您选择的水果是${fruit}`}</p>
      <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])}></FruitAdd>
      <FruitList fruits={fruits} setFruit={setFruit}></FruitList>
    </div>
  );
}
