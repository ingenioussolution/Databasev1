import {
  EXPORT_LIST_REQUEST,
  EXPORT_LIST_SUCCESS,
  EXPORT_LIST_FAIL,
  EXPORT_LIST_RESET,
  MASTER_CCC_REQUEST,
  MASTER_CCC_SUCCESS,
  MASTER_CCC_FAIL,
  MASTER_CCC_RESET,
} from '../constants/exportDataConstants'

export const listExportDataReducer = (state = { exporting:[] }, action) => {
  switch (action.type) {
    case EXPORT_LIST_REQUEST:
      return { loading: true }
    case EXPORT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        exporting: action.payload
      }
    case EXPORT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case EXPORT_LIST_RESET:
      return { exporting: [] }
    default:
      return state
  }
}


// export data Master CCC
export const MasterCCC_DataReducer = (state = { exporting:[] }, action) => {
  switch (action.type) {
    case MASTER_CCC_REQUEST:
      return { loading: true }
    case MASTER_CCC_SUCCESS:
      return {
        loading: false,
        success: true,
        exporting: action.payload
      }
    case MASTER_CCC_FAIL:
      return { loading: false, error: action.payload }
    case MASTER_CCC_RESET:
      return { exporting: [] }
    default:
      return state
  }
}