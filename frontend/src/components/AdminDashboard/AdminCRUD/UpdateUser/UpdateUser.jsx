import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUser,
  register,
  getUserDetailsAsAdmin,
} from '../../../../actions/userActions'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import { mdUp } from '../../../../utils/breakpoints'
import { isValidEmail } from '../../../../utils/validation.js'
import {
  Grid,
  Card,
  TextField,
  Button,
  Snackbar,
  CardHeader,
  CardContent,
  InputAdornment,
  Tooltip,
  Switch,
} from '@material-ui/core'
import { FaInfoCircle, FaSave, FaChevronLeft } from 'react-icons/fa'
import PasswordInput from '../../../passwordInput/PasswordInput'
import clsx from 'clsx'
import HorizontalLoader from '../../../horizontalLoader/HorizontalLoader'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'

const UpdateUserAdmin = ({ match, width }) => {
  const commons = layoutStyles()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { id } = match.params ? match.params : { id: -1 }
  const isNew = !(id && id !== -1)

  const [errorMsg, setErrorMsg] = useState(false)

  const userRegister = useSelector((state) => state.userRegister)
  const {
    error: errorRegister,
    loading: registering,
    success,
    adminUserInfo,
  } = userRegister

  const updateUsers = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdating,
    success: userUpdated,
    loading: updatingUser,
  } = updateUsers

  const userDetails = useSelector((state) => state.userDetails)
  const { loading: fetchingUser, error: errorFetchingUser, user } = userDetails

  const userDataInitialState = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    status: '',
    isAdmin: '',
    password: '',
    confirmPassword: '',
  }

  const [userData, setUserData] = useState(userDataInitialState)

  useEffect(() => {
    if (!isNew) {
      dispatch(getUserDetailsAsAdmin(id))
    } else {
      setUserData(userDataInitialState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location])

  const validationSchema = {
    email: {
      valid: userData.email ? isValidEmail(userData.email) : true,
      errorMsg: 'Email format incorrect',
      validate: (v) => (v ? isValidEmail(v) : true),
    },
  }

  const [validation, setValidation] = useState(validationSchema)

  const handleOnChange = (evt) => {
    const { name, value } = evt.target
    setUserData({ ...userData, [name]: value || '' })

    const validate = validation[name]?.validate
    if (typeof validate === 'function') {
      setValidation({
        ...validation,
        [name]: {
          ...validation[name],
          valid: validate(value),
        },
      })
    }
  }
  const handleOnChangeStatus = (evt) => {
    const { name, checked } = evt.target
    setUserData({ ...userData, [name]: checked ? 'active' : 'inactive' })
  }

  const handleOnChangeAdmin = (evt) => {
    const { name, checked } = evt.target
    setUserData({ ...userData, [name]: checked ? true : false })
  }

  const handleBackClick = () => {
    history.goBack()
  }

  const resetActions = () => {
    setErrorMsg(false)
  }

  const handleAlertClose = () => {
    resetActions()
  }
  const isFormValid = () => {
    return validation.email.valid
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('userData', userData)

    if (isNew && isFormValid()) {
      if (userData.password === userData.confirmPassword) {
        dispatch(register(userData))
      } else {
        console.log('Ups! Passwords do not match')
      }
    } else if (isFormValid()) {
      dispatch(updateUser(userData))
    }else {
        setErrorMsg('Please check the data entered.')
      }
  }

  useEffect(() => {
    if (errorFetchingUser) setErrorMsg(errorFetchingUser)
    if (errorUpdating) setErrorMsg(errorUpdating)
    if (errorRegister) setErrorMsg(errorRegister)

    console.log('success', success)
    if (userUpdated || success) {
      //user updated and register
      history.push('/admin/list-users')
    }
    if (!isNew && user && !userUpdated) {
      setUserData({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        status: user.status,
        isAdmin: user.isAdmin,
        password: user.password,
      })
      setTimeout(() => {}, 500)
    }
  }, [
    user,
    userUpdated,
    success,
    errorFetchingUser,
    errorUpdating,
    errorRegister,
  ])

  return (
    
    <Grid container>
      <Snackbar
        open={errorMsg && errorMsg !== ''}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Message severity='error'>{errorMsg}</Message>
      </Snackbar>
      {fetchingUser ? (
        <Grid container justifyContent="center" spacing={10}>
          <Grid item>
            <Loader />
          </Grid>
        </Grid>
      ) : (
        <CardContent>
          <Grid container spacing={4} className={classes.mainContent}>
            <Grid container item xs={12} spacing={mdUp(width) ? 0 : 4}>
              <Grid container item xs={12}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTitle}
                    title={'User Details'}
                  />
                  <CardContent>
                    <form className={classes.form}>
                      <Grid
                        container
                        item
                        xs={12}
                        spacing={4}
                        justifyContent="flex-start"
                        alignItems="center"
                        className={classes.formContent}
                      >
                        <Grid container item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            label="First name"
                            name="firstName"
                            required
                            value={userData.firstName || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleOnChange}
                            InputProps={{
                              endAdornment: (
                                <Tooltip title="It accepts alphabet, space and special character(-_)">
                                  <InputAdornment position="end">
                                    <FaInfoCircle />
                                  </InputAdornment>
                                </Tooltip>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            label="Last name"
                            name="lastName"
                            required
                            value={userData.lastName || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleOnChange}
                            InputProps={{
                              endAdornment: (
                                <Tooltip title="It accepts alphabet, space and special character(-_)">
                                  <InputAdornment position="end">
                                    <FaInfoCircle />
                                  </InputAdornment>
                                </Tooltip>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={userData.email || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleOnChange}
                            InputProps={{
                              endAdornment: (
                                <Tooltip title="It accepts valid email format">
                                  <InputAdornment position="end">
                                    <FaInfoCircle />
                                  </InputAdornment>
                                </Tooltip>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            label="User name"
                            name="username"
                            required
                            fullWidth
                            variant="outlined"
                            value={userData.username || ''}
                            onChange={handleOnChange}
                            InputProps={{
                              endAdornment: (
                                <Tooltip title="It accepts alphabet, space and special character(-_)">
                                  <InputAdornment position="end">
                                    <FaInfoCircle />
                                  </InputAdornment>
                                </Tooltip>
                              ),
                            }}
                          />
                        </Grid>
                        {isNew && (
                          <Grid container item xs={12} sm={6}>
                            <PasswordInput
                              margin="normal"
                              name="password"
                              label="Password"
                              value={userData.password || ''}
                              id="password"
                              variant="outlined"
                              onChange={handleOnChange}
                            />
                          </Grid>
                        )}
                        {isNew && (
                          <Grid container item xs={12} sm={6}>
                            <PasswordInput
                              margin="normal"
                              name="confirmPassword"
                              label="Confirm password"
                              value={userData.confirmPassword || ''}
                              variant="outlined"
                              onChange={handleOnChange}
                            />
                          </Grid>
                        )}
                        <Grid
                          container
                          item
                          xs={12}
                          sm={6}
                          justifyContent="space-between"
                          alignItems="center"
                          className={classes.cardData}
                        >
                          <Grid item xs={4}>
                            <span>Status</span>
                          </Grid>
                          <Grid item>Inactive</Grid>
                          <Grid item>
                            <Switch
                              checked={userData.status === 'active'}
                              onChange={handleOnChangeStatus}
                              name="status"
                            />
                          </Grid>
                          <Grid item>Active</Grid>
                        </Grid>

                        <Grid
                          container
                          item
                          xs={12}
                          sm={6}
                          justifyContent="space-between"
                          alignItems="center"
                          className={classes.cardData}
                        >
                          <Grid item xs={6}>
                            <span>Admin</span>
                          </Grid>
                          <Grid item>No</Grid>
                          <Grid item>
                            <Switch
                              checked={userData.isAdmin === true}
                              onChange={handleOnChangeAdmin}
                              name="isAdmin"
                            />
                          </Grid>
                          <Grid item>Yes</Grid>
                        </Grid>
                        <Grid container item xs={12}>
                          <Grid item xs={12}>
                            {(updatingUser || registering) && (
                              <HorizontalLoader />
                            )}
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          className={classes.submitWrapper}
                          justifyContent="flex-end"
                          spacing={4}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            className={classes.noRightPad}
                          >
                            <Button
                              className={commons.secondaryBtn}
                              onClick={handleBackClick}
                              startIcon={<FaChevronLeft />}
                              fullWidth
                            >
                              Back
                            </Button>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={2}
                            className={classes.noRightPad}
                          >
                            <Button
                              name="save"
                              fullWidth
                              className={clsx(
                                classes.noRightPad,
                                commons.successBtn
                              )}
                              endIcon={<FaSave />}
                              onClick={handleSubmit}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      )}
      </Grid>
   
  )
}

export default UpdateUserAdmin
