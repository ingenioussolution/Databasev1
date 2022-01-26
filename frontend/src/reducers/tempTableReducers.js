import {
    PHONE_TEMP_LIST_REQUEST,
    PHONE_TEMP_LIST_SUCCESS,
    PHONE_TEMP_LIST_FAIL,
    PHONE_TEMP_LIST_RESET,
    PHONE_TEMP_COUNT_REQUEST,
    PHONE_TEMP_COUNT_SUCCESS,
    PHONE_TEMP_COUNT_FAIL,
    PHONE_TEMP_COUNT_RESET
} from '../constants/tempTableConstants'

export const listPhoneTempReducer = (state = { tempListPhones: [] }, action) => {
    switch (action.type) {
      case PHONE_TEMP_LIST_REQUEST:
        return { loading: true }
      case PHONE_TEMP_LIST_SUCCESS:
        return {
          loading: false,
          success: true,
          data: action.payload.data,
          page: action.payload.page,
          pages: action.payload.totalPages,
          count: action.payload.listTemp,
        }
      case PHONE_TEMP_LIST_FAIL:
        return { loading: false, error: action.payload }
      case PHONE_TEMP_LIST_RESET:
        return { tempListPhones: [] }
      default:
        return state
    }
  }


  export const listPhoneTempCountReducer = (state = {}, action) => {
    switch (action.type) {
      case PHONE_TEMP_COUNT_REQUEST:
        return { loading: true }
      case PHONE_TEMP_COUNT_SUCCESS:
        return {
          loading: false,
          success: true,
          count: action.payload,
        }
      case PHONE_TEMP_COUNT_FAIL:
        return { loading: false, error: action.payload }
      case PHONE_TEMP_COUNT_RESET:
        return { loading: false }
      default:
        return state
    }
  } 