import { createStore } from 'redux'
import toggleUser from './Reducers/userReducer'
import reducer from './Reducers/index'
export const store = createStore(reducer)
