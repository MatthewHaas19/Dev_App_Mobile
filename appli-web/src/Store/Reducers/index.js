import { combineReducers } from 'redux';
import toggleUser from './userReducer'
import toggleUserAdmin from './adminUser'
import toggleAuth from './authReducer'
import togglePosts from './postsReducer'
import toggleUserVote from './voteReducer'
import toggleComments from './commentsReducer'
import togglePos from './positionReducer'
import toggleAdminPage from './adminPage'
import toggleAdminHome from './adminHome'

export default combineReducers({
    user: toggleUser,
    auth: toggleAuth,
    posts: togglePosts,
    userAdmin: toggleUserAdmin,
    votes: toggleUserVote,
    comments: toggleComments,
    position: togglePos,
    adminPage: toggleAdminPage,
    adminHome: toggleAdminHome,
});
