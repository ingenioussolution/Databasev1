import {
    PHONE_TEMP_LIST_REQUEST,
    PHONE_TEMP_LIST_SUCCESS,
    PHONE_TEMP_LIST_FAIL,
    PHONE_TEMP_LIST_RESET
} from '../constants/tempTableConstants'

export const listPhoneTempReducer = (state = { tempListPhones: [] }, action) => {
    switch (action.type) {
      case PHONE_TEMP_LIST_REQUEST:
        return { loading: true }
      case PHONE_TEMP_LIST_SUCCESS:
        return {
          loading: false,
          tempListPhones: action.payload.data,
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