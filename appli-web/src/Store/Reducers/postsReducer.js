const initialState = { posts: [], currentIdPost:"", adminCurrentPost:{}}

function togglePosts(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ADD_POSTS':
    state = {posts:action.posts}
    case 'CURRENT_POST':
    state = {posts:state.posts,currentIdPost:action.currentIdPost}
    case 'ADMIN_CURRENT_POST':
    state = {posts:state.posts,adminCurrentPost:action.adminCurrentPost}
    return state
  default:
    return state
  }
}

export default togglePosts
