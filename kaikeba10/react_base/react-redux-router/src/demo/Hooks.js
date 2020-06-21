import React, { useState, useEffect, useReducer, useContext } from 'react'

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)}>{f}</li>
    ))
  )
}

function FruitAdd() {
  const [pname, setPname] = useState('')
  const { dispatch } = useContext(Context)
  const onAddFruit = e => {
    if (e.key === 'Enter') {
      // props.onAddFruit(pname)
      dispatch({ type: 'add', payload: pname })
      setPname('')
    }
  }
  return (
    <div><input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit} /></div>
  )
}

// 将状态移至全局
function fruitReducer(state, action) {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'add':
      return [...state, action.payload]
    default:
      return state
  }
}

const Context = React.createContext()

function HookTest() {
  // useState是状态初始值
  // 返回一个数组，第一个是状态变量，第二个是变更函数
  const [fruit, setFruit] = useState('草莓')
  // const [fruits, setFruits] = useState([])
  // 第一个是reducer，第二个是初始值
  const [fruits, dispatch] = useReducer(fruitReducer, [])

  // 使用useEffect操作副作用，务必设置空数组表示仅执行一次
  useEffect(() => {
    console.log('get fruits...')
    setTimeout(() => {
      dispatch({ type: 'init', payload: ['草莓', '香蕉'] })
    }, 1000);
  }, [])

  useEffect(() => {
    document.title = fruit
  }, [fruit])

  return (
    <Context.Provider value={{ fruits, dispatch }}>
      <div>
        <p>{fruit === '' ? '请选择喜欢的水果' : `你选择了${fruit}`}</p>
        <FruitAdd />
        {/* <FruitAdd onAddFruit={pname => dispatch({ type: 'add', payload: pname })} /> */}
        <FruitList fruits={fruits} setFruit={setFruit} />
      </div>
    </Context.Provider>
  )
}

export default HookTest
