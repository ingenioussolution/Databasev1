import {
    BAD_AREA_LIST_REQUEST,
    BAD_AREA_LIST_SUCCESS,
    BAD_AREA_LIST_FAIL,
    BAD_AREA_LIST_RESET,
    BAD_AREA_REGISTER_REQUEST,
    BAD_AREA_REGISTER_SUCCESS,
    BAD_AREA_REGISTER_FAIL,
    BAD_AREA_REGISTER_RESET,
    BAD_AREA_DELETE_REQUEST,
    BAD_AREA_DELETE_SUCCESS,
    BAD_AREA_DELETE_FAIL,
    BAD_AREA_DELETE_RESET,
    BAD_AREA_UPDATE_REQUEST,
    BAD_AREA_UPDATE_SUCCESS,
    BAD_AREA_UPDATE_FAIL,
    BAD_AREA_UPDATE_RESET,
} from '../constants/badAreaConstants'


export const listBadAreaReducer = (state = { badArea: [] }, action) => {
    switch (action.type) {
      case BAD_AREA_LIST_REQUEST:
        return { loading: true }
      case BAD_AREA_LIST_SUCCESS:
        return { loading: false, badArea: action.payload }
      case BAD_AREA_LIST_FAIL:
        return { loading: false, error: action.payload }
      case BAD_AREA_LIST_RESET:
        return { badArea: [] }
      default:
        return state
    }
}

export const registerBadAreaReducer = (state = {}, action) => {
    switch (action.type) {
      case BAD_AREA_REGISTER_REQUEST:
        return { loading: true }
      case BAD_AREA_REGISTER_SUCCESS:
        return { loading: false,  success: true, userInfo: action.payload }
      case BAD_AREA_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case BAD_AREA_REGISTER_RESET:
        return { loading: false }
      default:
        return state
    }
  }

  export const updateBadAreaReducer = (state = {badArea: {}}, action) => {
    switch (action.type) {
      case BAD_AREA_UPDATE_REQUEST:
        return { loading: true }
      case BAD_AREA_UPDATE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload }
      case BAD_AREA_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case BAD_AREA_UPDATE_RESET:
        return {badArea: {}}
      default:
        return state
    }
}

  export const deleteBadAreaReducer = (state = {}, action) => {
    switch (action.type) {
      case BAD_AREA_DELETE_REQUEST:
        return { loading: true }
      case BAD_AREA_DELETE_SUCCESS:
        return { loading: false, success: true }
      case BAD_AREA_DELETE_FAIL:
        return { loading: false, error: action.payload }
      case BAD_AREA_DELETE_RESET:
        return { loading: false }
      default:
        return state
    }
  }