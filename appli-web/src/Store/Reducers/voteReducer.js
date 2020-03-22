const initialState = { votes: [], votesComment: []}

function toggleUserVote(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_USER_VOTE':
    state = {votes:action.userVote,votesComment:state.votesComment}
    return state
    case 'TOGGLE_USER_VOTE_COMMENT':
    state = {votes:state.votes,votesComment:action.userVote}
    console.log("COOOMMMENT")
    console.log(action.userVote)
    return state
  default:
    return state
  }
}

export default toggleUserVote
