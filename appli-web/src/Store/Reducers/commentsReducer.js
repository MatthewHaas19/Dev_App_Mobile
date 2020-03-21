const initialState = { adminCurrentComment:{}}

function toggleComments(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ADMIN_CURRENT_COMMENT':
    state = {adminCurrentComment:action.adminCurrentComment}
    return state
  default:
    return state
  }
}

export default toggleComments
