import {
  EXPORT_LIST_REQUEST,
  EXPORT_LIST_SUCCESS,
  EXPORT_LIST_FAIL,
  EXPORT_LIST_RESET,
  EXPORT_CCC_REQUEST,
  EXPORT_CCC_SUCCESS,
  EXPORT_CCC_FAIL,
  EXPORT_CCC_RESET,
  EXPORT_AWS_REQUEST,
  EXPORT_AWS_SUCCESS,
  EXPORT_AWS_FAIL,
  EXPORT_AWS_RESET
} from '../constants/exportDataConstants'

export const listExportDataReducer = (state = { exporting:[] }, action) => {
  switch (action.type) {
    case EXPORT_LIST_REQUEST:
      return { loading: true }
    case EXPORT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        exporting: action.payload,
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
export const ExportMaster_CCC_Reducer = (state = { exporting:[] }, action) => {
  switch (action.type) {
    case EXPORT_CCC_REQUEST:
      return { loading: true }
    case EXPORT_CCC_SUCCESS:
      return {
        loading: false,
        success: true,
        exporting: action.payload
      }
    case EXPORT_CCC_FAIL:
      return { loading: false, error: action.payload }
    case EXPORT_CCC_RESET:
      return { exporting: [] }
    default:
      return state
  }
}

// export data Master CCC
export const Export_Csv_Reducer = (state = { url:{} }, action) => {
  switch (action.type) {
    case EXPORT_AWS_REQUEST:
      return { loading: true }
    case EXPORT_AWS_SUCCESS:
      return {
        loading: false,
        success: true,
        url: action.payload
      }
    case EXPORT_AWS_FAIL:
      return { loading: false, error: action.payload }
    case EXPORT_AWS_RESET:
      return { url: [] }
    default:
      return state
  }
} 