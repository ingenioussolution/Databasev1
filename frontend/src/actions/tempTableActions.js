import axios from 'axios'
import {
    PHONE_TEMP_LIST_REQUEST,
    PHONE_TEMP_LIST_SUCCESS,
    PHONE_TEMP_LIST_FAIL
} from '../constants/tempTableConstants'

export const listPhoneTemporalData = (page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONE_TEMP_LIST_REQUEST,
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
  
      const { data } = await axios.get(`/data-temporal/get-temp?pageNumber=${page}`, config)
  
      dispatch({
        type: PHONE_TEMP_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PHONE_TEMP_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }