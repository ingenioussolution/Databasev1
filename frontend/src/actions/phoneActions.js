import axios from 'axios'
import {
  PHONE_REGISTER_SUCCESS,
  PHONE_REGISTER_FAIL,
  PHONE_REGISTER_REQUEST,
  PHONE_DELETE_SUCCESS,
  PHONE_DELETE_FAIL,
  PHONE_DELETE_REQUEST,
  PHONE_LIST_REQUEST,
  PHONE_LIST_SUCCESS,
  PHONE_LIST_FAIL,
} from '../constants/phone'

export const getPhones = () => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_LIST_REQUEST,
    })

    const { data } = await axios.get('/phone')

    dispatch({
      type: PHONE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PHONE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerPhone = (phones) => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/phone', phones, config)

    dispatch({
      type: PHONE_REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('phoneInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: PHONE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePhone = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_DELETE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.delete(`/phone/${id}`, config)

    dispatch({
      type: PHONE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PHONE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
