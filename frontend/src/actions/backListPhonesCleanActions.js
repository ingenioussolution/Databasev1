import axios from 'axios'
import {
  BLACK_LIST_PHONE_REGISTER_REQUEST,
  BLACK_LIST_PHONE_REGISTER_FAIL,
  BLACK_LIST_PHONE_REGISTER_SUCCESS,
  BLACK_LIST_PHONE_DELETE_REQUEST,
  BLACK_LIST_PHONE_DELETE_FAIL,
  BLACK_LIST_PHONE_DELETE_SUCCESS,
  BLACK_LIST_PHONE_LIST_REQUEST,
  BLACK_LIST_PHONE_LIST_SUCCESS,
  BLACK_LIST_PHONE_LIST_FAIL,
} from '../constants/backListPhonesClean'

export const getPhonesCarrier = () => async (dispatch) => {
  try {
    dispatch({
      type: BLACK_LIST_PHONE_LIST_REQUEST,
    })

    const { data } = await axios.get('/carrier')

    dispatch({
      type: BLACK_LIST_PHONE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BLACK_LIST_PHONE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerPhoneCarrier = (phoneCarrier) => async (dispatch) => {
    try {
      dispatch({
        type: BLACK_LIST_PHONE_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post('/carrier', phoneCarrier, config)
  
      dispatch({
        type: BLACK_LIST_PHONE_REGISTER_SUCCESS,
        payload: data,
      })
  
     // localStorage.setItem('phoneInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: BLACK_LIST_PHONE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deletePhoneCarrier = (idList) => async (dispatch) => {
    try {
      dispatch({
        type: BLACK_LIST_PHONE_DELETE_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      await axios.delete('/carrier',idList, config)
  
      dispatch({
        type: BLACK_LIST_PHONE_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BLACK_LIST_PHONE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  