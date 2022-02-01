import axios from 'axios'
import {
  API_BL_UPLOAD_CSV_REQUEST,
  API_BL_UPLOAD_CSV_SUCCESS,
  API_BL_UPLOAD_CSV_FAIL,
  API_BL_LIST_REQUEST,
  API_BL_LIST_SUCCESS,
  API_BL_LIST_FAIL,
 
  PHONE_LOOP_UP_REQUEST,
  PHONE_LOOP_UP_SUCCESS,
  PHONE_LOOP_UP_FAIL,
  IMPORT_CLEAN_DATA_REQUEST,
  IMPORT_CLEAN_DATA_SUCCESS,
  IMPORT_CLEAN_DATA_FAIL,
} from '../constants/apiBlackListConstants'

// List upload data
export const list_Clean_Data = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: API_BL_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api-black-list?user=${userInfo._id}`,
      config
    )

    dispatch({
      type: API_BL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: API_BL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Upload data for Clean Loop-Up
export const upload_Api_Csv = (file, options) => async (dispatch, getState) => {
  try {
    dispatch({
      type: API_BL_UPLOAD_CSV_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
      onUploadProgress: options.onUploadProgress,
    }

    const { data } = await axios.post(
      `/api-black-list/uploadApi?user=${userInfo._id}`,
      file,
      config
    )

    dispatch({
      type: API_BL_UPLOAD_CSV_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: API_BL_UPLOAD_CSV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//Process clean data
export const Clean_Look_Up = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONE_LOOP_UP_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api-black-list/clean-bl-api', config)

    dispatch({
      type: PHONE_LOOP_UP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PHONE_LOOP_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Import clean data
export const Import_Clean_Data = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMPORT_CLEAN_DATA_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api-black-list/import-bl-api', config)

    console.log('data', data)
    dispatch({
      type: IMPORT_CLEAN_DATA_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: IMPORT_CLEAN_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
