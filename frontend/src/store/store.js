import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  registerPhoneReducer,
  deletePhoneReducer,
  phoneListReducer,
} from '../reducers/phoneReducers'

import {
  deletePhoneCarrierReducer,
  phoneCarrierListReducer,
  registerPhoneCarrierReducer,
} from '../reducers/backListPhonesCleanReducer'

import {
  adminUserLoginReducer,
  userLoginReducer,
  adminUserForgotPasswordReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from '../reducers/userReducers'

import { listPhoneCleanReducer } from '../reducers/phoneListCleanReducer'

const reducer = combineReducers({
  //List Phones reducers
  registerPhone: registerPhoneReducer,
  deletePhone: deletePhoneReducer,
  phoneList: phoneListReducer,
  registerPhoneCarrier: registerPhoneCarrierReducer,
  deletePhoneCarrier: deletePhoneCarrierReducer,
  phoneCarrierList: phoneCarrierListReducer,
  listPhoneClean: listPhoneCleanReducer,
  //User reducers
  userLogin: userLoginReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  // Admin Reducers
  adminUserLogin: adminUserLoginReducer,
  adminUserForgotPassword: adminUserForgotPasswordReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const adminUserInfoFromStorage = localStorage.getItem('adminUserInfo')
  ? JSON.parse(localStorage.getItem('adminUserInfo'))
  : null

const middleware = [thunk]
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminUserLogin: { adminUserInfo: adminUserInfoFromStorage },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
