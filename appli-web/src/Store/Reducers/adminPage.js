const initialState = {pageToShow:"posts"}

function toggleAdminPage(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_ADMIN_PAGE':
    state = {pageToShow:action.pageToShow}
    return state
  default:
    return state
  }
}

export default toggleAdminPage
