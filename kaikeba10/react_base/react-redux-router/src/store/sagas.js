// 任务清单
import { call, put, takeEvery } from 'redux-saga/effects'

// 模拟登陆
const UserServise = {
  login(uname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === 'Jerry') {
          resolve({ id: 1, name: 'Jerry', age: 25 })
        } else {
          reject('用户名或密码错误')
        }
      }, 1000);
    })
  }
}

// worker Saga
function* login(action) {
  try {
    yield put({ type: 'requestLogin' })
    const result = yield call(UserServise.login, action.uname)
    yield put({ type: 'loginSuccess', result })
  } catch (message) {
    yield put({ type: 'loginFailure', message })
  }
}

function* mySaga() {
  yield takeEvery('login', login)
}

export default mySaga