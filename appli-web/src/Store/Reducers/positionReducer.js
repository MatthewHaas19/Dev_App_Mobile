const initialState = { position: []}

function togglePos(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_POSITION':
    state = {position:action.currentPosition}
    console.log(action.currentPosition)
    return state
  default:
    return state
  }
}

export default togglePos
