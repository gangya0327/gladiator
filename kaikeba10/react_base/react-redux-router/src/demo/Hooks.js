import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { add, asyncFetch } from '../store/fruit.redux'
import { login } from '../store/user.redux'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'

function FruitList({ fruits, setFruit }) {
  return (
    <div>
      <ul>
        {
          fruits.map(f => (
            <li key={f} onClick={() => setFruit(f)}>
              <Link to={'/list/detail/' + f}>{f}</Link>
            </li>
          ))
        }
      </ul>
      <Route path='/list/detail/:fruit' component={Detail}></Route>
    </div>
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

function Detail({ match, history, location }) {
  console.log(match, history, location)
  return (
    <div>
      <h3>{match.params.fruit}详情</h3>
      <p>...</p>
      <div>
        <button onClick={history.goBack}>返回</button>
      </div>
    </div>
  )
}

// 创建高阶组件，包装Route使其可以验证用户登录状态
const PrivateRoute = connect(state => ({
  isLogin: state.user.isLogin
}))(function ({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        props => (
          isLogin
            ? (<Component {...props}></Component>)
            : (<Redirect
              to={{
                pathname: '/login',
                state: { redirect: props.location.pathname }
              }}
            ></Redirect>)
        )
      }
    >
    </Route>
  )
})

const Login = connect(state => ({
  isLogin: state.user.isLogin
}), { login })(function ({ location, isLogin, login }) {
  const redirect = location?.state?.redirect || '/'
  if (isLogin) {
    return <Redirect to={redirect} />
  }
  return (
    <div>
      <p>用户登录</p>
      <hr />
      <button onClick={login}>登录</button>
    </div>
  )
})

function HookTest({ fruits, loading, asyncFetch }) {
  const [fruit, setFruit] = useState('草莓')
  useEffect(() => {
    console.log('get fruits...')
    asyncFetch(['草莓', '香蕉', '苹果'])
  }, [])

  useEffect(() => {
    document.title = fruit
  }, [fruit])

  return (
    <BrowserRouter>
      <nav>
        <Link to='/list'>水果列表</Link>
        |
        <Link to='/add'>添加水果</Link>
      </nav>
      <div>
        <Switch>
          <Route path='/list' render={() => (
            loading
              ? '加载中...' :
              <FruitList fruits={fruits} setFruit={setFruit} />

          )}></Route>
          {/* <Route exact path='/add' component={FruitAdd}></Route> */}
          <PrivateRoute exact path='/add' component={FruitAdd}></PrivateRoute>
          <Route to='/login' component={Login}></Route>
          {/* <Redirect to='/list'></Redirect> */}
          <Route component={() => (<h2>页面不存在</h2>)}></Route>
        </Switch>
      </div>
      <div>
        <p>{fruit === '' ? '请选择喜欢的水果' : `你选择了${fruit}`}</p>
        {/* <FruitAdd /> */}
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  fruits: state.fruit.list,
  loading: state.fruit.loading
})
const mapDispatchToProps = {
  add,
  asyncFetch
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HookTest, FruitAdd)
