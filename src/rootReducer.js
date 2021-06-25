import {combineReducers} from 'redux'
import {cartReducer} from './reducer/cartReducer'
import {orderReducer} from './reducer/orderReducer'

const reducers=combineReducers({
    cartReducer,
    orderReducer
})
export default reducers