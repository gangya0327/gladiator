import React, { useState, useEffect, useReducer, useContext } from "react";

function FruitList({ fruitList, setFruit }) {
  return fruitList.map(item => (
    <li key={item} onClick={() => setFruit(item)}>
      {item}
    </li>
  ));
}

function FruitAdd({ onAddFruit }) {
  const [pname, setPname] = useState("");
  const { dispatch } = useContext(Context);
  const addFruit = e => {
    if (e.key === "Enter") {
      //   onAddFruit(pname);
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={addFruit}
      />
    </div>
  );
}

function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}

const Context = React.createContext();

export default function HookTest2() {
  const [fruit, setFruit] = useState("苹果");
  //   const [fruitList, setFruitList] = useState([]);
  const [fruitList, dispatch] = useReducer(fruitReducer, []);

  useEffect(() => {
    setTimeout(() => {
      //   setFruitList(["苹果", "草莓"]);
      dispatch({ type: "init", payload: ["苹果", "草莓"] });
    }, 1000);
  }, []);

  useEffect(() => {
    document.title = fruit;
  }, [fruit]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("running");
    }, 1000);
    return function() {
      clearInterval(timer);
    };
  });

  return (
    <Context.Provider value={{ fruitList, dispatch }}>
      <div>
        <p>{fruit === "" ? "请选择喜爱的水果" : `您选择的水果是${fruit}`}</p>
        {/* <FruitAdd
        onAddFruit={pname => setFruitList([...fruitList, pname])}
      ></FruitAdd> */}
        {/* <FruitAdd
          onAddFruit={pname => dispatch({ type: "add", payload: pname })}
        ></FruitAdd> */}
        <FruitAdd></FruitAdd>
        <FruitList fruitList={fruitList} setFruit={setFruit}></FruitList>
      </div>
    </Context.Provider>
  );
}
