import { combineReducers } from 'redux';
import toggleUser from './userReducer'
import toggleAuth from './authReducer'

export default combineReducers({
    user: toggleUser,
    auth: toggleAuth
});
