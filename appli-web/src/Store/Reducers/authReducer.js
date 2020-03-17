const initialState = { isAuth: false}

function toggleAuth(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_AUTH':
      state = {isAuth:true}
      return state
    default:
      return state
  }
}

export default toggleAuth
