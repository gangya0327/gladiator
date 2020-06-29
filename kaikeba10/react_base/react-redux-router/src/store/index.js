import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import fruitReducer from './fruit.redux'
import userReducer from './user.redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// 第二个参数是中间件函数
const store = createStore(
  combineReducers({ fruit: fruitReducer, user: userReducer }),
  applyMiddleware(logger, thunk, sagaMiddleware)
)

sagaMiddleware.run(mySaga)

export default store


/**
 * redux书写步骤
 * 1 store创建 createStore
 * 2 注册 Provider store={store}
 * 3 connect(state=>({isLogin},{login}))(Comp)
 */