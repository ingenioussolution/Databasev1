import axios from 'axios'
import {
  EXPORT_LIST_REQUEST,
  EXPORT_LIST_SUCCESS,
  EXPORT_LIST_FAIL,
  EXPORT_CCC_REQUEST,
  EXPORT_CCC_SUCCESS,
  EXPORT_CCC_FAIL,
  EXPORT_AWS_REQUEST,
  EXPORT_AWS_SUCCESS,
  EXPORT_AWS_FAIL,
} from '../constants/exportDataConstants'

export const exportData = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPORT_LIST_REQUEST,
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

    const { data } = await axios.get(`/phoneslist/${query}`, config)

    console.log("export data");
    dispatch({
      type: EXPORT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const exportMaster_CCC_Data = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPORT_CCC_REQUEST,
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

    const { data } = await axios.get(`/phoneslist/${query}`, config)

    dispatch({
      type: EXPORT_CCC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPORT_CCC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// GET csv file
export const Export_Csv_File = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPORT_AWS_REQUEST,
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

    const { data } = await axios.get(`/export-aws?id=${userInfo._id}`, config)

    console.log('action url', data)

    dispatch({
      type: EXPORT_AWS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EXPORT_AWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
