const initialState = { isAuth: false}

function toggleAuth(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_AUTH':
      state = {isAuth:true}
      console.log("isAuth")
      return state
    case 'TOGGLE_UNAUTH':
      state = {isAuth:false}
      return state
    default:
      return state
  }
}

export default toggleAuth
