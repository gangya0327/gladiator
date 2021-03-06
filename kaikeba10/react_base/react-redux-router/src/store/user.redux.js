const initialState = { isLogin: false, loading: false }
export default (state = initialState, action) => {
  switch (action.type) {
    case 'requestionLogin':
      return { isLogin: false, loading: true }
    case 'loginSuccess':
      return { isLogin: true, loading: false }
    case 'loginFailure':
      return { isLogin: false, loading: false }
    default:
      return state
  }
}

export function login(uname) {
  return { type: 'login', uname }
}

// export function login(user) {
//   return dispatch => {
//     dispatch({ type: 'requesLogin' })
//     setTimeout(() => {
//       if (Date.now() % 2 === 0) {
//         dispatch({ type: 'loginSuccess' })
//       } else {
//         dispatch({ type: 'loginFailure' })
//       }
//     }, 1000);
//   }
// }