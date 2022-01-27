import axios from 'axios'
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  ADMIN_USER_LOGIN_FAIL,
  ADMIN_USER_LOGIN_REQUEST,
  ADMIN_USER_LOGIN_SUCCESS,
  ADMIN_USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  ADMIN_USER_FORGOT_PASSWORD_REQUEST,
  ADMIN_USER_FORGOT_PASSWORD_SUCCESS,
  ADMIN_USER_FORGOT_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  ADMIN_USER_FORGOT_PASSWORD_RESET,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
} from '../constants/userConstants'
import {
  sendEmail,
  FORGOT_PASSWORD_EMAIL_TEMPLATE_ID,
  RESET_PASSWORD_EMAIL_TEMPLATE_ID,
} from '../utils/sendEmail'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/users/admin-login',
      { email, password },
      config
    )

    dispatch({
      type: ADMIN_USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('adminUserInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADMIN_USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
  
}

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem('adminUserInfo')
  dispatch({ type: ADMIN_USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
}

export const register = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }
    user.profilePicture = ''
    const { data } = await axios.post('/users', user, config)

    // Talk with Chris for prices

    // await sendEmail(CONFIRMATION_REGISTER_FAN, {
    //   to_name: `${user.firstName} ${user.lastName}`,
    //   to_email: user.email,
    //   title: 'Confirmation Fan',
    // })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/users/profile`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetailsAsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    const { data } = await axios.get(`/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put('/users/profile', user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//----------------------------------------------------------------
export const updateUserProfilePicture =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/users/profile-picture',
        formData,
        config
      )

      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateUserProfilePictureAsAdmin =
  (id, formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_REQUEST,
      })

      const {
        adminUserLogin: { adminUserInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/users/profile-picture/${id}`,
        formData,
        config
      )

      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_PICTURE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    const { data } = await axios.get('/users', config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsersAsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    const { data } = await axios.get('/users', config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/users/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUserAsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    await axios.delete(`/users/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  console.log("user Action", user);
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
 
    const {
      adminUserLogin: { adminUserInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    }

    const { data } = await axios.put(`/users/${user._id}`, user, config)
    console.log("data", data);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  console.log('email forgot password', email)
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    })

    const { data } = await axios.post('/users/forgot-password', { email })

    await sendEmail(FORGOT_PASSWORD_EMAIL_TEMPLATE_ID, {
      to_name: data.firstName,
      to_email: email,
      subject: 'Password reset link',
      reset_password_link: `https://${window.location.hostname}/reset-password/${data.token}`,
    })

    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_FORGOT_PASSWORD_REQUEST,
    })

    const { data } = await axios.post('/users/admin-forgot-password', {
      email,
    })

    await sendEmail(FORGOT_PASSWORD_EMAIL_TEMPLATE_ID, {
      to_name: data.firstName,
      to_email: email,
      subject: 'Password reset link',
      reset_password_link: `https://${window.location.hostname}/admin/reset-password/${data.token}`,
    })

    dispatch({
      type: ADMIN_USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminForgotPasswordReset = () => async (dispatch) => {
  dispatch({
    type: ADMIN_USER_FORGOT_PASSWORD_RESET,
  })
}

export const resetPassword =
  (token, newPassword, verifyPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_RESET_PASSWORD_REQUEST,
      })

      const { data } = await axios.post(`/users/reset-password`, {
        token,
        newPassword,
        verifyPassword,
      })

      await sendEmail(RESET_PASSWORD_EMAIL_TEMPLATE_ID, {
        to_name: data.firstName,
        to_email: data.email,
        subject: 'Password changed!',
      })

      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
