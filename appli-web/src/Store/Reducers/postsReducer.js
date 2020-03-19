const initialState = { posts: []}

function togglePosts(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ADD_POSTS':
    state = {posts:action.posts}
    console.log("posts")
    console.log(state)
    return state
  default:
    return state
  }
}

export default togglePosts
