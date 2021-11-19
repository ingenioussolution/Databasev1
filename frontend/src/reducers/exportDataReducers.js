import {
  EXPORT_LIST_REQUEST,
  EXPORT_LIST_SUCCESS,
  EXPORT_LIST_FAIL,
  EXPORT_LIST_RESET,
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
