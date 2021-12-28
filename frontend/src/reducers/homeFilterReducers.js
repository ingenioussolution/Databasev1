import {
  CLICKER_REQUEST,
  CLICKER_SUCCESS,
  CLICKER_FAIL,
  CLICKER_RESET,
  CONVERTER_REQUEST,
  CONVERTER_SUCCESS,
  CONVERTER_FAIL,
  CONVERTER_RESET,
  CCC_REQUEST,
  CCC_SUCCESS,
  CCC_FAIL,
  CCC_RESET,
  BAD_STATE_REQUEST,
  BAD_STATE_SUCCESS,
  BAD_STATE_FAIL,
  BAD_STATE_RESET,
  HARD_BOUNCE_REQUEST,
  HARD_BOUNCE_SUCCESS,
  HARD_BOUNCE_FAIL,
  HARD_BOUNCE_RESET,
  SUPPRESSED_REQUEST,
  SUPPRESSED_SUCCESS,
  SUPPRESSED_FAIL,
  SUPPRESSED_RESET,
  VERIZON_REQUEST,
  VERIZON_SUCCESS,
  VERIZON_FAIL,
  VERIZON_RESET,
  ATT_REQUEST,
  ATT_SUCCESS,
  ATT_FAIL,
  ATT_RESET,
  SPRINT_REQUEST,
  SPRINT_SUCCESS,
  SPRINT_FAIL,
  SPRINT_RESET,
  T_MOBILE_REQUEST,
  T_MOBILE_SUCCESS,
  T_MOBILE_FAIL,
  T_MOBILE_RESET,
  US_CELLULAR_REQUEST,
  US_CELLULAR_SUCCESS,
  US_CELLULAR_FAIL,
  US_CELLULAR_RESET,
  MASTER_VERIZON_REQUEST,
  MASTER_VERIZON_SUCCESS,
  MASTER_VERIZON_FAIL,
  MASTER_VERIZON_RESET,
  MASTER_ATT_REQUEST,
  MASTER_ATT_SUCCESS,
  MASTER_ATT_FAIL,
  MASTER_ATT_RESET,
  MASTER_SPRINT_REQUEST,
  MASTER_SPRINT_SUCCESS,
  MASTER_SPRINT_FAIL,
  MASTER_SPRINT_RESET,
  MASTER_T_MOBILE_REQUEST,
  MASTER_T_MOBILE_SUCCESS,
  MASTER_T_MOBILE_FAIL,
  MASTER_T_MOBILE_RESET,
} from '../constants/homeFilterConstants'

export const CountClickerReducer = (state = {}, action) => {
  switch (action.type) {
    case CLICKER_REQUEST:
      return { loading: true }
    case CLICKER_SUCCESS:
      return {
        loading: false,
        success: true,
        clicker: action.payload,
      } //, userInfo: action.payload }
    case CLICKER_FAIL:
      return { loading: false, error: action.payload }
    case CLICKER_RESET:
      return {}
    default:
      return state
  }
}

export const CountConverterReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERTER_REQUEST:
      return { loading: true }
    case CONVERTER_SUCCESS:
      return {
        loading: false,
        success: true,
        converter: action.payload,
      } //, userInfo: action.payload }
    case CONVERTER_FAIL:
      return { loading: false, error: action.payload }
    case CONVERTER_RESET:
      return {}
    default:
      return state
  }
}

export const CountCCCReducer = (state = {}, action) => {
  switch (action.type) {
    case CCC_REQUEST:
      return { loading: true }
    case CCC_SUCCESS:
      return { loading: false, success: true, ccc: action.payload } //, userInfo: action.payload }
    case CCC_FAIL:
      return { loading: false, error: action.payload }
    case CCC_RESET:
      return {}
    default:
      return state
  }
}

export const CountBadStatesReducer = (state = {}, action) => {
  switch (action.type) {
    case BAD_STATE_REQUEST:
      return { loading: true }
    case BAD_STATE_SUCCESS:
      return {
        loading: false,
        success: true,
        badState: action.payload,
      } //, userInfo: action.payload }
    case BAD_STATE_FAIL:
      return { loading: false, error: action.payload }
    case BAD_STATE_RESET:
      return {}
    default:
      return state
  }
}

export const CountHardBounceReducer = (state = {}, action) => {
  switch (action.type) {
    case HARD_BOUNCE_REQUEST:
      return { loading: true }
    case HARD_BOUNCE_SUCCESS:
      return {
        loading: false,
        success: true,
        hardBounce: action.payload,
      } //, userInfo: action.payload }
    case HARD_BOUNCE_FAIL:
      return { loading: false, error: action.payload }
    case HARD_BOUNCE_RESET:
      return {}
    default:
      return state
  }
}

export const CountSupressedReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPRESSED_REQUEST:
      return { loading: true }
    case SUPPRESSED_SUCCESS:
      return {
        loading: false,
        success: true,
        suppressed: action.payload,
      } //, userInfo: action.payload }
    case SUPPRESSED_FAIL:
      return { loading: false, error: action.payload }
    case SUPPRESSED_RESET:
      return {}
    default:
      return state
  }
}

export const CountVerizonReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIZON_REQUEST:
      return { loading: true }
    case VERIZON_SUCCESS:
      return { loading: false, success: true, verizon: action.payload } //, userInfo: action.payload }
    case VERIZON_FAIL:
      return { loading: false, error: action.payload }
    case VERIZON_RESET:
      return {}
    default:
      return state
  }
}

export const CountAttReducer = (state = {}, action) => {
  switch (action.type) {
    case ATT_REQUEST:
      return { loading: true }
    case ATT_SUCCESS:
      return { loading: false, success: true, att: action.payload } //, userInfo: action.payload }
    case ATT_FAIL:
      return { loading: false, error: action.payload }
    case ATT_RESET:
      return {}
    default:
      return state
  }
}

export const CountSprintReducer = (state = {}, action) => {
  switch (action.type) {
    case SPRINT_REQUEST:
      return { loading: true }
    case SPRINT_SUCCESS:
      return { loading: false, success: true , sprint: action.payload} //, userInfo: action.payload }
    case SPRINT_FAIL:
      return { loading: false, error: action.payload }
    case SPRINT_RESET:
      return {}
    default:
      return state
  }
}

export const CountTMobileReducer = (state = {}, action) => {
  switch (action.type) {
    case T_MOBILE_REQUEST:
      return { loading: true }
    case T_MOBILE_SUCCESS:
      return { loading: false, success: true, tMobile: action.payload} //, userInfo: action.payload }
    case T_MOBILE_FAIL:
      return { loading: false, error: action.payload }
    case T_MOBILE_RESET:
      return {}
    default:
      return state
  }
}

export const CountUsCellularReducer = (state = {}, action) => {
  switch (action.type) {
    case US_CELLULAR_REQUEST:
      return { loading: true }
    case US_CELLULAR_SUCCESS:
      return { loading: false, success: true, usCellular: action.payload } //, userInfo: action.payload }
    case US_CELLULAR_FAIL:
      return { loading: false, error: action.payload }
    case US_CELLULAR_RESET:
      return {}
    default:
      return state
  }
}

// Master CCC 

export const MasterCCCVerizonReducer = (state = {}, action) => {
  switch (action.type) {
    case MASTER_VERIZON_REQUEST:
      return { loading: true }
    case MASTER_VERIZON_SUCCESS:
      return { loading: false, success: true, masterVerizon: action.payload }
    case MASTER_VERIZON_FAIL:
      return { loading: false, error: action.payload }
    case MASTER_VERIZON_RESET:
      return {}
    default:
      return state
  }
}


export const MasterCCCAttReducer = (state = {}, action) => {
  switch (action.type) {
    case MASTER_ATT_REQUEST:
      return { loading: true }
    case MASTER_ATT_SUCCESS:
      return { loading: false, success: true, masterAtt: action.payload } 
    case MASTER_ATT_FAIL:
      return { loading: false, error: action.payload }
    case MASTER_ATT_RESET:
      return {}
    default:
      return state
  }
}


export const MasterCCCSprintReducer = (state = {}, action) => {
  switch (action.type) {
    case MASTER_SPRINT_REQUEST:
      return { loading: true }
    case MASTER_SPRINT_SUCCESS:
      return { loading: false, success: true, masterSprint: action.payload } 
    case MASTER_SPRINT_FAIL:
      return { loading: false, error: action.payload }
    case MASTER_SPRINT_RESET:
      return {}
    default:
      return state
  }
}

export const MasterCCC_T_MobileReducer = (state = {}, action) => {
  switch (action.type) {
    case MASTER_T_MOBILE_REQUEST:
      return { loading: true }
    case MASTER_T_MOBILE_SUCCESS:
      return { loading: false, success: true, masterTMobile: action.payload } 
    case MASTER_T_MOBILE_FAIL:
      return { loading: false, error: action.payload }
    case MASTER_T_MOBILE_RESET:
      return {}
    default:
      return state
  }
}