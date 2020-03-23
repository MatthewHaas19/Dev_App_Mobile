const initialState = {infos:{posts:[],comments:[],users:[]}}

function toggleAdminHome(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_ADMIN_INFOS':
    state = {infos:action.listInfos}
    return state
  default:
    return state
  }
}

export default toggleAdminHome
