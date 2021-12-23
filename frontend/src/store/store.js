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
  adminUserForgotPasswordReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
  userRegisterReducer,
  //--- profile User---
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from '../reducers/userReducers'

import { listPhoneCleanReducer, importDataReducer, masterCCCReducer } from '../reducers/phoneListCleanReducer'

import {listPhoneTempReducer} from '../reducers/tempTableReducers'
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

import {listExportDataReducer, MasterCCC_DataReducer} from '../reducers/exportDataReducers'
import {uploadCsvDataReducer} from '../reducers/uploadCsvReducers'

import {
  CountClickerReducer,
  CountConverterReducer,
  CountCCCReducer,
  CountBadStatesReducer,
  CountHardBounceReducer,
  CountSupressedReducer,
  CountVerizonReducer,
  CountAttReducer,
  CountSprintReducer,
  CountTMobileReducer,
  CountUsCellularReducer,
} from '../reducers/homeFilterReducers'

const reducer = combineReducers({
  //List Phones reducers
  registerPhone: registerPhoneReducer,
  deletePhone: deletePhoneReducer,
  phoneList: phoneListReducer,
  registerPhoneCarrier: registerPhoneCarrierReducer,
  deletePhoneCarrier: deletePhoneCarrierReducer,
  phoneCarrierList: phoneCarrierListReducer,

  // tables phoneList

  listPhoneClean: listPhoneCleanReducer,
  masterCCC: masterCCCReducer,

  //Import Data
  importData: importDataReducer,
  //User reducers
  userLogin: userLoginReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  // Admin Reducers
  userList: userListReducer,
  adminUserLogin: adminUserLoginReducer,
  adminUserForgotPassword: adminUserForgotPasswordReducer,
  userDelete: userDeleteReducer,
  userRegister: userRegisterReducer,
  // setting Email
  siteSettingsDetails: siteSettingsReducer,
  siteSettingsUpdate: siteSettingsUpdateReducer,
  systemUpdateNotify: systemUpdateNotifyReducer,
  // Bad Area Code
  listBadArea: listBadAreaReducer,
  registerBadArea: registerBadAreaReducer,
  updateBadArea: updateBadAreaReducer,
  deleteBadArea: deleteBadAreaReducer,

  // Export data
  listExportData: listExportDataReducer,
  MasterCCC_Data: MasterCCC_DataReducer,

  // Upload data
  uploadCsvData: uploadCsvDataReducer,

  // Temporal table Data
  listPhoneTemp: listPhoneTempReducer,

  // filter home
  CountClicker: CountClickerReducer,
  CountConverter: CountConverterReducer,
  CountCCC: CountCCCReducer,
  CountBadStates: CountBadStatesReducer,
  CountHardBounce: CountHardBounceReducer,
  CountSupressed: CountSupressedReducer,
  CountVerizon: CountVerizonReducer,
  CountAtt: CountAttReducer,
  CountSprint: CountSprintReducer,
  CountTMobile: CountTMobileReducer,
  CountUsCellular: CountUsCellularReducer,
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
