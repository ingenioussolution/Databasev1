import axios from 'axios'
import {
  CLICKER_REQUEST,
  CLICKER_SUCCESS,
  CLICKER_FAIL,
  CONVERTER_REQUEST,
  CONVERTER_SUCCESS,
  CONVERTER_FAIL,
  CCC_REQUEST,
  CCC_SUCCESS,
  CCC_FAIL,
  BAD_STATE_REQUEST,
  BAD_STATE_SUCCESS,
  BAD_STATE_FAIL,
  HARD_BOUNCE_REQUEST,
  HARD_BOUNCE_SUCCESS,
  HARD_BOUNCE_FAIL,
  SUPPRESSED_REQUEST,
  SUPPRESSED_SUCCESS,
  SUPPRESSED_FAIL,
  VERIZON_REQUEST,
  VERIZON_SUCCESS,
  VERIZON_FAIL,
  ATT_REQUEST,
  ATT_SUCCESS,
  ATT_FAIL,
  SPRINT_REQUEST,
  SPRINT_SUCCESS,
  SPRINT_FAIL,
  T_MOBILE_REQUEST,
  T_MOBILE_SUCCESS,
  T_MOBILE_FAIL,
  US_CELLULAR_REQUEST,
  US_CELLULAR_SUCCESS,
  US_CELLULAR_FAIL,
  MASTER_VERIZON_REQUEST,
  MASTER_VERIZON_SUCCESS,
  MASTER_VERIZON_FAIL,
  MASTER_ATT_REQUEST,
  MASTER_ATT_SUCCESS,
  MASTER_ATT_FAIL,
  MASTER_SPRINT_REQUEST,
  MASTER_SPRINT_SUCCESS,
  MASTER_SPRINT_FAIL,
  MASTER_T_MOBILE_REQUEST,
  MASTER_T_MOBILE_SUCCESS,
  MASTER_T_MOBILE_FAIL,
} from '../constants/homeFilterConstants'

export const getCountClicker = () => async (dispatch) => {
  try {
    dispatch({
      type: CLICKER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get('/filters/clicker', config)

    console.log('data clicker', data)

    dispatch({
      type: CLICKER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CLICKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountConverter = () => async (dispatch) => {
  try {
    dispatch({
      type: CONVERTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/converter', config)
    dispatch({
      type: CONVERTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONVERTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountCCC = () => async (dispatch) => {
  try {
    dispatch({
      type: CCC_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/ccc', config)
    dispatch({
      type: CCC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CCC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountBadState = () => async (dispatch) => {
  try {
    dispatch({
      type: BAD_STATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/bad-states-code', config)
    dispatch({
      type: BAD_STATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BAD_STATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountHardBounce = () => async (dispatch) => {
  try {
    dispatch({
      type: HARD_BOUNCE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/hard-bounce', config)
    dispatch({
      type: HARD_BOUNCE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HARD_BOUNCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountSuppressed = () => async (dispatch) => {
  try {
    dispatch({
      type: SUPPRESSED_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/suppressed', config)
    dispatch({
      type: SUPPRESSED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPRESSED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountVerizon = () => async (dispatch) => {
  try {
    dispatch({
      type: VERIZON_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/verizon', config)
    dispatch({
      type: VERIZON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VERIZON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountAtt = () => async (dispatch) => {
  try {
    dispatch({
      type: ATT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/att', config)
    dispatch({
      type: ATT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ATT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountSprint = () => async (dispatch) => {
  try {
    dispatch({
      type: SPRINT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/sprint', config)
    dispatch({
      type: SPRINT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SPRINT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountTMobile = () => async (dispatch) => {
  try {
    dispatch({
      type: T_MOBILE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/t-mobile', config)
    dispatch({
      type: T_MOBILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: T_MOBILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCountUsCellular = () => async (dispatch) => {
  try {
    dispatch({
      type: US_CELLULAR_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/us-cellular', config)
    dispatch({
      type: US_CELLULAR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: US_CELLULAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Master CCC by Carrier

export const getMasterVerizon = () => async (dispatch) => {
  try {
    dispatch({
      type: MASTER_VERIZON_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/master-verizon', config)
    dispatch({
      type: MASTER_VERIZON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MASTER_VERIZON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getMasterAtt = () => async (dispatch) => {
  try {
    dispatch({
      type: MASTER_ATT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/master-att', config)
    dispatch({
      type: MASTER_ATT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MASTER_ATT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getMasterSprint = () => async (dispatch) => {
  try {
    dispatch({
      type: MASTER_SPRINT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/master-sprint', config)
    dispatch({
      type: MASTER_SPRINT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MASTER_SPRINT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMasterTMobile = () => async (dispatch) => {
  try {
    dispatch({
      type: MASTER_T_MOBILE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/filters/master-t-mobile', config)
    dispatch({
      type: MASTER_T_MOBILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MASTER_T_MOBILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}