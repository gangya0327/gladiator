import React, { useState, useEffect, useReducer } from 'react'

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)}>{f}</li>
    ))
  )
}

function FruitAdd(props) {
  const [pname, setPname] = useState('')
  const onAddFruit = e => {
    if (e.key === 'Enter') {
      props.onAddFruit(pname)
      setPname('')
    }
  }
  return (
    <div><input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit} /></div>
  )
}

function HookTest() {
  // useState是状态初始值
  // 返回一个数组，第一个是状态变量，第二个是变更函数
  const [fruit, setFruit] = useState('草莓')
  const [fruits, setFruits] = useState([])

  // 使用useEffect操作副作用，务必设置空数组表示仅执行一次
  useEffect(() => {
    console.log('get fruits...')
    setTimeout(() => {
      setFruits(['草莓', '香蕉'])
    }, 1000);
  }, [])

  useEffect(() => {
    document.title = fruit
  }, [fruit])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log('hooks start')
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <div>
      <p>{fruit === '' ? '请选择喜欢的水果' : `你选择了${fruit}`}</p>
      <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} />
      <FruitList fruits={fruits} setFruit={setFruit} />
    </div>
  )
}

export default HookTest
