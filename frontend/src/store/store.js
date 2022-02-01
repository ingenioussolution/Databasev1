import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  registerPhoneReducer,
  deletePhoneReducer,
  phoneListReducer,
} from '../reducers/phoneReducers'

import {
  upload_Api_Csv_Reducer,
  list_Clean_Data_Reducer,
  Import_Clean_Data_Reducer,
  Clean_Look_Up_Reducer,
  list_API_Data_Reducer,
} from '../reducers/apiBlackListReducer'

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

import {
  listPhoneCleanReducer,
  importDataReducer,
  masterCCCReducer,
} from '../reducers/phoneListCleanReducer'

import {
  listPhoneTempReducer,
  listPhoneTempCountReducer,
} from '../reducers/tempTableReducers'
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

import {
  listExportDataReducer,
  ExportMaster_CCC_Reducer,
  Export_Csv_Reducer,
} from '../reducers/exportDataReducers'
import { uploadCsvDataReducer } from '../reducers/uploadCsvReducers'

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
  MasterCCCVerizonReducer,
  MasterCCCAttReducer,
  MasterCCCSprintReducer,
  MasterCCC_T_MobileReducer,
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
  ExportMaster_CCC: ExportMaster_CCC_Reducer,
  Export_Csv: Export_Csv_Reducer,

  // Upload data
  uploadCsvData: uploadCsvDataReducer,

  // Temporal table Data
  listPhoneTemp: listPhoneTempReducer,
  listPhoneCount: listPhoneTempCountReducer,

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
  MasterCCCVerizon: MasterCCCVerizonReducer,
  MasterCCCAtt: MasterCCCAttReducer,
  MasterCCCSprint: MasterCCCSprintReducer,
  MasterCCC_T_Mobile: MasterCCC_T_MobileReducer,

  // Loop up data API Black List

  R_Upload_Api_Csv: upload_Api_Csv_Reducer,
  R_List_Clean_Data: list_Clean_Data_Reducer,
  R_Import_Clean_Data: Import_Clean_Data_Reducer,
  R_Clean_Look_Up: Clean_Look_Up_Reducer,
  list_API_Data: list_API_Data_Reducer,
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
