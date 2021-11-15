import {
  SITE_SETTINGS_DETAILS_REQUEST,
  SITE_SETTINGS_DETAILS_SUCCESS,
  SITE_SETTINGS_DETAILS_FAIL,
  SITE_SETTINGS_DETAILS_RESET,
  SITE_SETTINGS_UPDATE_REQUEST,
  SITE_SETTINGS_UPDATE_SUCCESS,
  SITE_SETTINGS_UPDATE_FAIL,
  SITE_SETTINGS_UPDATE_RESET,
  SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_REQUEST,
  SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_SUCCESS,
  SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_FAIL,
  SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_RESET,
} from '../constants/siteSettingsConstants'

export const siteSettingsReducer = (state = { siteSettings: {} }, action) => {
  switch (action.type) {
    case SITE_SETTINGS_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SITE_SETTINGS_DETAILS_SUCCESS:
      return { loading: false, siteSettings: action.payload }
    case SITE_SETTINGS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case SITE_SETTINGS_DETAILS_RESET:
      return { siteSettings: {} }
    default:
      return state
  }
}

export const siteSettingsUpdateReducer = (
  state = { siteSettings: {} },
  action
) => {
  switch (action.type) {
    case SITE_SETTINGS_UPDATE_REQUEST:
      return { loading: true }
    case SITE_SETTINGS_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case SITE_SETTINGS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SITE_SETTINGS_UPDATE_RESET:
      return {
        siteSettings: {},
      }
    default:
      return state
  }
}

export const systemUpdateNotifyReducer = (state = {}, action) => {
  switch (action.type) {
    case SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_REQUEST:
      return { loading: true }
    case SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_SUCCESS:
      return { loading: false, success: true }
    case SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_FAIL:
      return { loading: false, error: action.payload }
    case SITE_SETTINGS_SYSTEM_UPDATE_NOTIFY_RESET:
      return {}
    default:
      return state
  }
}
