import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  Grid,
  Card,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Tooltip,
  InputAdornment,
  Box,
  Divider,
  IconButton,
} from '@material-ui/core'
import { FaInfoCircle, FaSave } from 'react-icons/fa'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import {
  getUserDetails,
  updateProfile,
} from '../../../../actions/userActions'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'

const ProfileUser = () => {
  const classes = useStyles()
  const commons = layoutStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin
  const userProfile = useSelector((state) => state.userDetails)
  const { loading: loadingUSER, error, user } = userProfile
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    loading,
    error: errorUpdate,
    success: successUpdate
  } = userUpdateProfile

  // states
  const [value, setValue] = React.useState('0')
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    document.title = 'Profile User | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    if (successUpdate) {
      setUserName(userInfo.username)
    } else {
      if (!user && userInfo) {
        dispatch(getUserDetails(userInfo._id))
      } else {
        setUserName(user.username)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, userInfo, user])


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const submitHandlerPassword = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      Swal.fire(
        'Attention',
        'The new password do not match with the confirm password',
        'warning'
      )
    }
    if (userInfo._id) {
      dispatch(
        updateProfile({
          _id: userInfo._id,
          password: newPassword,
        })
      )
    }
  }

  const submitHandlerName = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      Swal.fire(
        'Attention',
        'The new password do not match with the confirm password',
        'warning'
      )
    }
    if (userInfo._id) {
      dispatch(
        updateProfile({
          _id: userInfo._id,
          username: userName,
          firstName: firstName,
          lastName: lastName,
        })
      )
    }
  }

  return (
    <Grid container>
      <Card className={classes.wrapper}>
        <CardHeader title={'Settings'} />
        <CardContent>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="user Name" value="0" />
                <Tab label="Change Password" value="1" />
              </TabList>
              <Divider />
            </Box>
            <TabPanel value="0" tabIndex="0">
              {loading && <Loader />}
              {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
              {loadingUSER ? (
                <Loader />
              ) : error ? (
                <Message severity="error">{error}</Message>
              ) : (
                <Grid container justifyContent="center" spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Card className={classes.card}>
                      <CardContent>
                        <form
                          className={classes.form}
                          onSubmit={submitHandlerName}
                        >
                          <Grid
                            container
                            item
                            xs={12}
                            spacing={4}
                            justifyContent="flex-start"
                            alignItems="center"
                            className={classes.formContent}
                          >
                            <Grid container item xs={12}>
                              <TextField
                                margin="normal"
                                label="User Name"
                                name="userName"
                                required
                                id="nameProfile"
                                value={userName || ''}
                                fullWidth
                                onChange={(e) => setUserName(e.target.value)}
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
                            <Grid container item xs={12}>
                              <TextField
                                margin="normal"
                                label="First Name"
                                name="firstName"
                                required
                                id="firstNameProfile"
                                value={firstName || ''}
                                fullWidth
                                onChange={(e) => setFirstName(e.target.value)}
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
                            <Grid container item xs={12}>
                              <TextField
                                margin="normal"
                                label="Last Name"
                                name="lastName"
                                required
                                id="lastNameProfile"
                                value={lastName || ''}
                                fullWidth
                                onChange={(e) => setLastName(e.target.value)}
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
                            <Grid
                              container
                              item
                              xs={12}
                              className={classes.submitWrapper}
                              justifyContent="flex-end"
                              spacing={3}
                            >
                              <Grid item xs={12} sm={2}>
                                <Button
                                  type="submit"
                                  fullWidth
                                  className={commons.successBtn}
                                  endIcon={<FaSave />}
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
              )}
            </TabPanel>
            <TabPanel value="1">
            {loading && <Loader />}
              {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
              {loadingUSER ? (
                <Loader />
              ) : error ? (
                <Message severity="error">{error}</Message>
              ) : (
              <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={12} md={8}>
                  <Card className={classes.card}>
                    <CardContent>
                      <form
                        className={classes.form}
                        onSubmit={submitHandlerPassword}
                      >
                        <Grid
                          container
                          item
                          xs={12}
                          spacing={4}
                          justifyContent="flex-start"
                          alignItems="center"
                          className={classes.formContent}
                        >
                          <Grid container item xs={12}>
                            <TextField
                              autoComplete="newPassword"
                              margin="normal"
                              id="newPassword"
                              label="New Password"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              required
                              fullWidth
                              value={newPassword || ''}
                              onChange={(e) => setNewPassword(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? (
                                        <GoEye />
                                      ) : (
                                        <GoEyeClosed />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid container item xs={12}>
                            <TextField
                              autoComplete="confirmPassword"
                              margin="normal"
                              id="confirmPassword"
                              label="Confirm Password"
                              name="password"
                              required
                              type={showPassword ? 'text' : 'password'}
                              fullWidth
                              value={confirmPassword || ''}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? (
                                        <GoEye />
                                      ) : (
                                        <GoEyeClosed />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid
                            container
                            item
                            xs={12}
                            className={classes.submitWrapper}
                            justifyContent="flex-end"
                            spacing={3}
                          >
                            <Grid item xs={12} sm={2}>
                              <Button
                                type="submit"
                                fullWidth
                                className={commons.successBtn}
                                endIcon={<FaSave />}
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
              )}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProfileUser
