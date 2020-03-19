import { combineReducers } from 'redux';
import toggleUser from './userReducer'
import toggleAuth from './authReducer'
import togglePosts from './postsReducer'

export default combineReducers({
    user: toggleUser,
    auth: toggleAuth,
    posts: togglePosts
});
