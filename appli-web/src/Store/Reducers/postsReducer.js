const initialState = { posts: [], currentIdPost:""}

function togglePosts(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ADD_POSTS':
    state = {posts:action.posts}
    console.log("posts")
    console.log(state)
    case 'CURRENT_POST':
    state = {posts:state.posts,currentIdPost:action.currentIdPost}
    console.log("current post")
    console.log(state)
    return state
  default:
    return state
  }
}

export default togglePosts
