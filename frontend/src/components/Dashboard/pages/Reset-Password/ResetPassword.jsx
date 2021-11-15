import React, { useEffect, useState } from 'react'
import {
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Avatar,
} from '@material-ui/core'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import Swal from 'sweetalert2/src/sweetalert2.js'
import Message from '../../../message/Message'
import Loader from '../../../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetPassword } from '../../../../actions/userActions'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import useStyles from './styles'
import useStylesLogin from '../Login/Styles'

const ResetPassword = ({ match }) => {
  const classes = useStyles()
  const classesLogin = useStylesLogin()
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    document.title = 'User Password Reset - IGS-DB'
  })

  const [userCredentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
    token: match.params.token,
  })

  const [showPassword, setShowPassword] = useState(false)

  const { password, confirmPassword, token } = userCredentials

  const userResetPassword = useSelector((state) => state.userResetPassword)
  const { loading, error, success } = userResetPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      Swal.fire(
        'Attention',
        'The password do not match with the confirm password',
        'warning'
      )
    }
    dispatch(resetPassword(token, password, confirmPassword))
  }

  const handleChange = (e) => {
    const { value, name } = e.target

    setCredentials({ ...userCredentials, [name]: value })
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push('/'), 1000)
    }
  }, [history, success])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Grid>
      <Paper elevation={10} className={classesLogin.formWrapper}>
        <form className={classesLogin.form} onSubmit={handleSubmit}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            className={classesLogin.formContent}
          >
            <Grid
              container
              item
              xs={12}
              direction="column"
              justifyContent="center"
              alignItems="center"
              className={classesLogin.formHeader}
            >
              <Avatar className={classesLogin.avatarStyle}>
                <VpnKeyIcon />
              </Avatar>
              <h2>Reset password</h2>
              <span>Enter your new password</span>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              {error && (
                <Message severity="error" className={classes.loginError}>
                  {error}
                </Message>
              )}
              {success && (
                <Message severity="success" className={classes.loginError}>
                  Password changed!
                </Message>
              )}
              {loading && <Loader />}
            </Grid>

           <Grid container item xs={12}>
              <TextField
                autoComplete="password"
                name="password"
                required
                fullWidth
                id="password"
                label="new password"
                type={showPassword ? 'text' : 'password'}
                value={password || ''}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <GoEye /> : <GoEyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                autoComplete="confirmPassword"
                name="confirmPassword"
                required
                fullWidth
                id="confirmPassword"
                label="confirm password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword || ''}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <GoEye /> : <GoEyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} className={classesLogin.btnWrapper}>
              <Button type="submit"
              variant="contained"
              className={classesLogin.btnStyle}
              fullWidth>
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  )
}

export default ResetPassword
