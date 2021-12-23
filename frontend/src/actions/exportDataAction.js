import axios from 'axios'
import {
  EXPORT_LIST_REQUEST,
  EXPORT_LIST_SUCCESS,
  EXPORT_LIST_FAIL,
  MASTER_CCC_REQUEST,
  MASTER_CCC_SUCCESS,
  MASTER_CCC_FAIL
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
      type: MASTER_CCC_REQUEST,
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
      type: MASTER_CCC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MASTER_CCC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}