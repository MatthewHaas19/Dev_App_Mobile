import { combineReducers } from 'redux';
import toggleUser from './userReducer'
import toggleUserAdmin from './adminUser'
import toggleAuth from './authReducer'
import togglePosts from './postsReducer'
import toggleComments from './commentsReducer'

export default combineReducers({
    user: toggleUser,
    auth: toggleAuth,
    posts: togglePosts,
    userAdmin: toggleUserAdmin,
    comments: toggleComments,
});
