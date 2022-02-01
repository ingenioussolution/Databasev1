import axios from 'axios'
import {
    PHONE_TEMP_COUNT_REQUEST,
    PHONE_TEMP_COUNT_SUCCESS,
    PHONE_TEMP_COUNT_FAIL
} from '../constants/tempTableConstants'

export const listPhoneTemporalData = (page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONE_TEMP_COUNT_REQUEST,
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
  
      //const { data } = await axios.get(`/data-temporal/get-temp?pageNumber=${page}`, config)
      const { data } = await axios.get('/data-temporal', config)

      dispatch({
        type: PHONE_TEMP_COUNT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PHONE_TEMP_COUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }