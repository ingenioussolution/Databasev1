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
  PHONE_IMPORT_REQUEST,
  PHONE_IMPORT_SUCCESS,
  PHONE_IMPORT_FAIL,
} from '../constants/phonesListClean'

export const phoneListRegister = (phoneClean) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONE_CLEAN_REGISTER_REQUEST,
    })

    const {
      userInfo: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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

export const listPhoneData = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONE_CLEAN_LIST_REQUEST,
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

    const { data } = await axios.get(`/phoneslist?pageNumber=${page}`, config)

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

// Material table Action

export const listTableData = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONE_CLEAN_LIST_REQUEST,
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

    const { data } = await axios.get(`/phoneslist?${query}`, config)

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


// Delete
export const deletePhoneListClean = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONE_CLEAN_DELETE_REQUEST,
    })

    const {
      userInfo: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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

// Updated
export const updateListPhoneClean =
  (phoneList) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONE_CLEAN_UPDATE_REQUEST,
      })

      const {
        userInfo: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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

  // import data

  export const ImportData = (count) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONE_IMPORT_REQUEST,
      })
      console.log("enter action");
      // const {
      //   userLogin: { userInfo },
      // } = getState()

      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // }
  
      const config = {
        headers: {  
          'Content-Type': 'application/json', 
        },
      }
  
      //const { data } = await axios.post('/phoneslist/register-data', config)
      const { data } = await axios.post('/phoneslist/import-data', config)
     
      console.log("data", data);
      dispatch({
        type: PHONE_IMPORT_SUCCESS,
        payload: data,
      })   
    } catch (error) {
      dispatch({
        type: PHONE_IMPORT_FAIL, 
        payload:
          error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
      }) 
    }
  }