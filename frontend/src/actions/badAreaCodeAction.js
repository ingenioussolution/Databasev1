import axios from 'axios'
import {
    BAD_AREA_LIST_REQUEST,
    BAD_AREA_LIST_SUCCESS,
    BAD_AREA_LIST_FAIL,
    BAD_AREA_REGISTER_REQUEST,
    BAD_AREA_REGISTER_SUCCESS,
    BAD_AREA_REGISTER_FAIL,
    BAD_AREA_DELETE_REQUEST,
    BAD_AREA_DELETE_SUCCESS,
    BAD_AREA_DELETE_FAIL,
    BAD_AREA_UPDATE_REQUEST,
    BAD_AREA_UPDATE_SUCCESS,
    BAD_AREA_UPDATE_FAIL,
} from '../constants/badAreaConstants'

export const getAreaCode = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: BAD_AREA_LIST_REQUEST,
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
  
      const { data } = await axios.get('/bad-area-code',config)
  
      dispatch({
        type: BAD_AREA_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BAD_AREA_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const registerBadAreaCode = (badArea) => async (dispatch,getState) => {
    try {
      dispatch({
        type: BAD_AREA_REGISTER_REQUEST,
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
  
      const { data } = await axios.post('/bad-area-code', badArea, config)
  
      dispatch({
        type: BAD_AREA_REGISTER_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('phoneInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: BAD_AREA_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const UpdateBadAreaCode = (badArea) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BAD_AREA_UPDATE_REQUEST,
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
  
      const { data } = await axios.put(`/bad-area-code/${badArea._id}`, badArea, config)
  
      dispatch({
        type: BAD_AREA_UPDATE_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BAD_AREA_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deleteBadAreaCode = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BAD_AREA_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/bad-area-code/${id}`, config)
  
      dispatch({
        type: BAD_AREA_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BAD_AREA_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }