import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'

const PasswordInput = ({id, name, label, value, onChange, variant}) => {
  const [showPassword, setShowPassword] = useState(false)  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <TextField
      margin='normal'
      name={name}
      label={label}
      value={value}
      type={showPassword ? 'text' : 'password'}
      id={id}
      required
      fullWidth
      //onChange={(evt) => onChange(evt)}
      variant={variant}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} size='xs' />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size='xs' />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordInput
