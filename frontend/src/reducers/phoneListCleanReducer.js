import {
  // PHONE_CLEAN_REGISTER_REQUEST,
  // PHONE_CLEAN_REGISTER_FAIL,
  // PHONE_CLEAN_REGISTER_SUCCESS,
  // PHONE_CLEAN_DELETE_SUCCESS,
  // PHONE_CLEAN_DELETE_FAIL,
  // PHONE_CLEAN_DELETE_REQUEST,
  // PHONE_CLEAN_UPDATE_REQUEST,
  // PHONE_CLEAN_UPDATE_SUCCESS,
  // PHONE_CLEAN_UPDATE_FAIL,
  PHONE_CLEAN_LIST_REQUEST,
  PHONE_CLEAN_LIST_SUCCESS,
  PHONE_CLEAN_LIST_FAIL,
  PHONE_CLEAN_LIST_RESET,
} from '../constants/phonesListClean'

export const listPhoneCleanReducer = (state = { listPhones: [] }, action) => {
  switch (action.type) {
    case PHONE_CLEAN_LIST_REQUEST:
      return { loading: true }
    case PHONE_CLEAN_LIST_SUCCESS:
      return {
        loading: false,
        listPhones: action.payload.data,
        page: action.payload.page,
        pages: action.payload.totalPages,
      }
    case PHONE_CLEAN_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_CLEAN_LIST_RESET:
      return { phoneClean: [] }
    default:
      return state
  }
}
