import {
  API_BL_UPLOAD_CSV_REQUEST,
  API_BL_UPLOAD_CSV_SUCCESS,
  API_BL_UPLOAD_CSV_FAIL,
  API_BL_UPLOAD_CSV_RESET,
  API_BL_LIST_REQUEST,
  API_BL_LIST_SUCCESS,
  API_BL_LIST_FAIL,
  API_BL_LIST_RESET,

  PHONE_API_BL_LIST_REQUEST,
  PHONE_API_BL_LIST_SUCCESS,
  PHONE_API_BL_LIST_FAIL,
  PHONE_API_BL_LIST_RESET,

  PHONE_LOOP_UP_REQUEST,
  PHONE_LOOP_UP_SUCCESS,
  PHONE_LOOP_UP_FAIL,
  PHONE_LOOP_UP_RESET,
  IMPORT_CLEAN_DATA_REQUEST,
  IMPORT_CLEAN_DATA_SUCCESS,
  IMPORT_CLEAN_DATA_FAIL,
  IMPORT_CLEAN_DATA_RESET,
} from '../constants/apiBlackListConstants'

// Reducer Upload data for Clean Loop-Up
export const upload_Api_Csv_Reducer = (state = { file: {} }, action) => {
  switch (action.type) {
    case API_BL_UPLOAD_CSV_REQUEST:
      return { loading: true }
    case API_BL_UPLOAD_CSV_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case API_BL_UPLOAD_CSV_FAIL:
      return { loading: false, error: action.payload }
    case API_BL_UPLOAD_CSV_RESET:
      return { loading: false }
    default:
      return state
  }
}
// get list Api data
export const list_Clean_Data_Reducer = (state = { listApi: [] }, action) => {
  switch (action.type) {
    case PHONE_API_BL_LIST_REQUEST:
      return { loading: true }
    case PHONE_API_BL_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload.data,
        page: action.payload.page,
        pages: action.payload.totalPages,
        count: action.payload.listTemp,
      }
    case PHONE_API_BL_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_API_BL_LIST_RESET:
      return { listApi: [] }
    default:
      return state
  }
}

// get list Api data
export const list_API_Data_Reducer = (state = { listApi: [] }, action) => {
  switch (action.type) {
    case API_BL_LIST_REQUEST:
      return { loading: true }
    case API_BL_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload.data,
        page: action.payload.page,
        pages: action.payload.totalPages,
        count: action.payload.listTemp,
      }
    case API_BL_LIST_FAIL:
      return { loading: false, error: action.payload }
    case API_BL_LIST_RESET:
      return { listApi: [] }
    default:
      return state
  }
}

// Import clean data
export const Import_Clean_Data_Reducer = (state = {}, action) => {
  switch (action.type) {
    case IMPORT_CLEAN_DATA_REQUEST:
      return { loading: true }
    case IMPORT_CLEAN_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
        newTotal: action.payload.news,
        updateTotal: action.payload.update,
        total: action.payload.total,
      }
    case IMPORT_CLEAN_DATA_FAIL:
      return { loading: false, error: action.payload }
    case IMPORT_CLEAN_DATA_RESET:
      return { loading: false }
    default:
      return state
  }
}
//Process clean data
export const Clean_Look_Up_Reducer = (state = {}, action) => {
  switch (action.type) {
    case PHONE_LOOP_UP_REQUEST:
      return { loading: true }
    case PHONE_LOOP_UP_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      }
    case PHONE_LOOP_UP_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_LOOP_UP_RESET:
      return { loading: false }
    default:
      return state
  }
}
