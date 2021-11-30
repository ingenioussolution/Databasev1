import axios from 'axios'
import {
  UPLOAD_CSV_REQUEST,
  UPLOAD_CSV_SUCCESS,
  UPLOAD_CSV_FAIL,
} from '../constants/uploadDataConstants'

export const uploadData = (file,options) => async (dispatch, getState) => {
  console.log("file Action: ",file);
  console.log("options", options);
    try {
      dispatch({
        type: UPLOAD_CSV_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post('/upload-csv', file, config)
     
      console.log("data", data);

      dispatch({
        type: UPLOAD_CSV_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPLOAD_CSV_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }