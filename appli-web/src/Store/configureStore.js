import { createStore } from 'redux'
import toggleUser from './Reducers/userReducer'
import reducer from './Reducers/index'
export default createStore(reducer)
