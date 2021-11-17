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
  //--- profile User---
  userDetailsReducer,
  userUpdateProfileReducer,
} from '../reducers/userReducers'

import { listPhoneCleanReducer } from '../reducers/phoneListCleanReducer'

import {
  siteSettingsReducer,
  siteSettingsUpdateReducer,
  systemUpdateNotifyReducer,
} from '../reducers/siteSettingsReducer'

import {
  listBadAreaReducer,
  registerBadAreaReducer,
  updateBadAreaReducer,
  deleteBadAreaReducer,
} from '../reducers/badAreaReducers'

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
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  // Admin Reducers
  adminUserLogin: adminUserLoginReducer,
  adminUserForgotPassword: adminUserForgotPasswordReducer,
  // setting Email
  siteSettingsDetails: siteSettingsReducer,
  siteSettingsUpdate: siteSettingsUpdateReducer,
  systemUpdateNotify: systemUpdateNotifyReducer,
  // Bad Area Code
  listBadArea: listBadAreaReducer,
  registerBadArea: registerBadAreaReducer,
  updateBadArea: updateBadAreaReducer,
  deleteBadArea: deleteBadAreaReducer,
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
