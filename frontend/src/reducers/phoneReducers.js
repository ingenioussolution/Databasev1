import {
  PHONE_REGISTER_SUCCESS,
  PHONE_REGISTER_FAIL,
  PHONE_REGISTER_REQUEST,
  PHONE_REGISTER_RESET,
  PHONE_DELETE_SUCCESS,
  PHONE_DELETE_FAIL,
  PHONE_DELETE_REQUEST,
  PHONE_DELETE_RESET,
  PHONE_LIST_REQUEST,
  PHONE_LIST_SUCCESS,
  PHONE_LIST_FAIL,
  PHONE_LIST_RESET,
} from '../constants/phone'

export const registerPhoneReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONE_REGISTER_REQUEST:
      return { loading: true }
    case PHONE_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case PHONE_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_REGISTER_RESET:
      return { loading: false }
    default:
      return state
  }
}

export const deletePhoneReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONE_DELETE_REQUEST:
      return { loading: true }
    case PHONE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PHONE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_DELETE_RESET:
      return { loading: false }
    default:
      return state
  }
}

export const phoneListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case PHONE_LIST_REQUEST:
      return { loading: true }
    case PHONE_LIST_SUCCESS:
      return { loading: false, phones: action.payload }
    case PHONE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PHONE_LIST_RESET:
      return { phones: [] }
    default:
      return state
  }
}
