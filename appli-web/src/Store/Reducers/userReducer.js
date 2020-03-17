const initialState = { user: []}

function toggleUser(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_USER':
    state = {currentUser:action.currentUser}
    console.log(action.currentUser)
    return state
  default:
    return state
  }
}

export default toggleUser
