const initialState = { user: []}

function toggleUserAdmin(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_USER_ADMIN':
    state = {user:action.currentUser}
  default:
    return state
  }
}

export default toggleUserAdmin
