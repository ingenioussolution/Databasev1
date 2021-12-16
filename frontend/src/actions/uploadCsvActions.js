import axios from 'axios'
import {
  UPLOAD_CSV_REQUEST,
  UPLOAD_CSV_SUCCESS,
  UPLOAD_CSV_FAIL,
} from '../constants/uploadDataConstants'

export const uploadData = (file, options) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_CSV_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
      onUploadProgress: options.onUploadProgress,
    }
    
    const { data } = await axios.post('/upload-csv/test', file, config)
    //const { data } = await axios.post('/upload-csv/add-csv', file, config)

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
