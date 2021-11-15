import axios from 'axios'
import {
  SITE_SETTINGS_DETAILS_FAIL,
  SITE_SETTINGS_DETAILS_REQUEST,
  SITE_SETTINGS_DETAILS_SUCCESS,
  SITE_SETTINGS_UPDATE_FAIL,
  SITE_SETTINGS_UPDATE_REQUEST,
  SITE_SETTINGS_UPDATE_SUCCESS,
} from '../constants/siteSettingsConstants'

const api = '/settings'

const getAxiosConfig = (getState) => {
  const {
    adminUserLogin: { adminUserInfo },
    userLogin: { userInfo },
  } = getState()

  const user = adminUserInfo || userInfo

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
}

export const getSiteSettings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SITE_SETTINGS_DETAILS_REQUEST,
    })

    const config = getAxiosConfig(getState)

    const { data } = await axios.get(api, config)

    dispatch({
      type: SITE_SETTINGS_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SITE_SETTINGS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateSiteSettings = (settings) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SITE_SETTINGS_UPDATE_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    const { data } = await axios.put(`${api}/${settings._id}`, settings, config)

    dispatch({
      type: SITE_SETTINGS_UPDATE_SUCCESS,
    })
    dispatch({
      type: SITE_SETTINGS_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SITE_SETTINGS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getEmailJsService = async () => {
  const { data } = await axios.get(`${api}/emailjs-key`)
  localStorage.setItem('emailJsService', data)
  return data
}
