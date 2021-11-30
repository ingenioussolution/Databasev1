import {
    UPLOAD_CSV_REQUEST,
    UPLOAD_CSV_SUCCESS,
    UPLOAD_CSV_FAIL,
    UPLOAD_CSV_RESET,
  } from '../constants/uploadDataConstants'

  export const uploadCsvDataReducer = (state = {file:{}}, action) => {
    switch (action.type) {
      case UPLOAD_CSV_REQUEST:
        return { loading: true }
      case UPLOAD_CSV_SUCCESS:
        return {
          loading: false,
          success: true
        }
      case UPLOAD_CSV_FAIL:
        return { loading: false, error: action.payload }
      case UPLOAD_CSV_RESET:
        return {loading: false}
      default:
        return state
    }
  }