import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  registerPhoneReducer,
  deletePhoneReducer,
  phoneListReducer,
  registerPhoneCarrierReducer,
  deletePhoneCarrierReducer,
  phoneCarrierListReducer,
} from '../reducers/phoneReducers'

const reducer = combineReducers({
    //List Phones reducers
    registerPhone: registerPhoneReducer,
    deletePhone: deletePhoneReducer,
    phoneList: phoneListReducer,

    //List Black List Phone Reducer
})

const middleware = [thunk]
const initialState = {}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
