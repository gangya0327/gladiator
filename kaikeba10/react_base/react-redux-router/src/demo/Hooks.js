import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadingStart, loadingEnd, init, add } from '../store'

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)}>{f}</li>
    ))
  )
}

function FruitAdd({ add }) {
  const [pname, setPname] = useState('')
  const onAddFruit = e => {
    if (e.key === 'Enter') {
      // props.onAddFruit(pname)
      add(pname)
      setPname('')
    }
  }
  return (
    <div><input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit} /></div>
  )
}

function HookTest({ fruits, loading, loadingStart, loadingEnd, init }) {
  const [fruit, setFruit] = useState('草莓')
  useEffect(() => {
    console.log('get fruits...')
    loadingStart()
    setTimeout(() => {
      loadingEnd()
      init(['草莓', '香蕉'])
    }, 1000);
  }, [])

  useEffect(() => {
    document.title = fruit
  }, [fruit])

  return (
    <div>
      <p>{fruit === '' ? '请选择喜欢的水果' : `你选择了${fruit}`}</p>
      <FruitAdd />
      {
        loading
          ? '加载中...' :
          <FruitList fruits={fruits} setFruit={setFruit} />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  fruits: state.list,
  loading: state.loading
})
const mapDispatchToProps = {
  loadingStart,
  loadingEnd,
  init,
  add
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HookTest, FruitAdd)
