import axios from 'axios'
import {
    EXPORT_LIST_REQUEST,
    EXPORT_LIST_SUCCESS,
    EXPORT_LIST_FAIL,
} from '../constants/exportDataConstants'

export const exportData = (query) => async (dispatch, getState) => {
    
    console.log("query export",query);
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
        //`phoneslist/${query}`
        const { data } = await axios.get(`/phoneslist/${query}`,config)
        
        console.log("data export",data);
  
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
  