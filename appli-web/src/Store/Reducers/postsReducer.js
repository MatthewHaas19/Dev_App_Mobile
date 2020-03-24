const initialState = { posts: [], currentIdPost:"", adminCurrentPost:{}, adminListPost:[]}

function togglePosts(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ADD_POSTS':
    state = {posts:action.posts,currentIdPost:state.currentIdPost}
    console.log("addPost")
    case 'CURRENT_POST':
    state = {posts:state.posts,currentIdPost:action.currentIdPost}
    case 'ADMIN_CURRENT_POST':
    state = {posts:state.posts,adminListPost:state.adminListPost,adminCurrentPost:action.adminCurrentPost}
    case 'ADMIN_LIST_POST':
    state = {posts:state.posts,adminCurrentPost:state.adminCurrentPost,adminListPost:action.adminListPost}
    return state
  default:
    return state
  }
}

export default togglePosts
