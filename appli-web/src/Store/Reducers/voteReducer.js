const initialState = { votes: []}

function toggleUserVote(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_USER_VOTE':
    state = {votes:action.userVote}
    return state
  default:
    return state
  }
}

export default toggleUserVote
