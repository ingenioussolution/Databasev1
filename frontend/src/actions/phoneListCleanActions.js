import axios from 'axios'
import {
  PHONE_CLEAN_REGISTER_REQUEST,
  PHONE_CLEAN_REGISTER_FAIL,
  PHONE_CLEAN_REGISTER_SUCCESS,
  PHONE_CLEAN_DELETE_SUCCESS,
  PHONE_CLEAN_DELETE_FAIL,
  PHONE_CLEAN_DELETE_REQUEST,
  PHONE_CLEAN_UPDATE_REQUEST,
  PHONE_CLEAN_UPDATE_SUCCESS,
  PHONE_CLEAN_UPDATE_FAIL,
  PHONE_CLEAN_LIST_REQUEST,
  PHONE_CLEAN_LIST_SUCCESS,
  PHONE_CLEAN_LIST_FAIL,
} from '../constants/phonesListClean'

export const phoneListRegister = (phoneClean) => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_CLEAN_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/phoneslist', phoneClean, config)

    dispatch({
      type: PHONE_CLEAN_REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('phoneListInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: PHONE_CLEAN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPhoneData = (page) => async (dispatch) => {

  console.log("page Action: ",page);
  if (page === 0 ? 1 : page)
  console.log("page Action2: ",page);
  try {
    dispatch({
      type: PHONE_CLEAN_LIST_REQUEST,
    })

    //const { data } = await axios.get(url)
    const { data } = await axios.get(`/phoneslist?page=${page}`)

    dispatch({
      type: PHONE_CLEAN_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PHONE_CLEAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePhoneListClean = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_CLEAN_DELETE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.delete(`/phoneslist/${id}`, config)

    dispatch({
      type: PHONE_CLEAN_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PHONE_CLEAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateListPhoneClean = (phoneList) => async (dispatch) => {
  try {
    dispatch({
      type: PHONE_CLEAN_UPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(`/phoneslist/${phoneList.phone}`, phoneList, config)

    dispatch({
      type: PHONE_CLEAN_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PHONE_CLEAN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
