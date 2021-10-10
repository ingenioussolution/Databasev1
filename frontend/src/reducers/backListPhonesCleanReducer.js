import {
    BLACK_LIST_PHONE_REGISTER_REQUEST,
    BLACK_LIST_PHONE_REGISTER_FAIL,
    BLACK_LIST_PHONE_REGISTER_SUCCESS,
    BLACK_LIST_PHONE_REGISTER_RESET,
    BLACK_LIST_PHONE_DELETE_REQUEST,
    BLACK_LIST_PHONE_DELETE_FAIL,
    BLACK_LIST_PHONE_DELETE_SUCCESS,
    BLACK_LIST_PHONE_DELETE_RESET,
    BLACK_LIST_PHONE_LIST_REQUEST,
    BLACK_LIST_PHONE_LIST_SUCCESS,
    BLACK_LIST_PHONE_LIST_FAIL,
    BLACK_LIST_PHONE_LIST_RESET,
  } from '../constants/backListPhonesClean'

  export const registerPhoneCarrierReducer = (state = {}, action) => {
    switch (action.type) {
      case BLACK_LIST_PHONE_REGISTER_REQUEST:
        return { loading: true }
      case BLACK_LIST_PHONE_REGISTER_SUCCESS:
        return { loading: false, carriers: action.payload }
      case BLACK_LIST_PHONE_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case BLACK_LIST_PHONE_REGISTER_RESET:
        return { loading: false }
      default:
        return state
    }
  }

  export const deletePhoneCarrierReducer = (state = {}, action) => {
    switch (action.type) {
      case BLACK_LIST_PHONE_DELETE_REQUEST:
        return { loading: true }
      case BLACK_LIST_PHONE_DELETE_SUCCESS:
        return { loading: false, success: true }
      case BLACK_LIST_PHONE_DELETE_FAIL:
        return { loading: false, error: action.payload }
      case BLACK_LIST_PHONE_DELETE_RESET:
        return { loading: false }
      default:
        return state
    }
  }

  export const phoneCarrierListReducer = (state = { carriers: [] }, action) => {
    switch (action.type) {
      case BLACK_LIST_PHONE_LIST_REQUEST:
        return { loading: true }
      case BLACK_LIST_PHONE_LIST_SUCCESS:
        return { loading: false, carriers: action.payload }
      case BLACK_LIST_PHONE_LIST_FAIL:
        return { loading: false, error: action.payload }
      case BLACK_LIST_PHONE_LIST_RESET:
        return { carriers: [] }
      default:
        return state
    }
  }
  