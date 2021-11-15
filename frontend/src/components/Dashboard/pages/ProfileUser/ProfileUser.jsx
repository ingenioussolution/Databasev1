import React,{useEffect, useState} from 'react'
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

const ProfileUser = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const UserLogin = useSelector((state) => state.userLogin)
    const { userInfo } = UserLogin

    useEffect(() => {
        document.title = 'Profile User | Ingenious Solution Group'
    
        if (userInfo === null || userInfo === undefined) {
          history.push('/')
          return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [history, userInfo])


    return (
        <div>
            
        </div>
    )
}

export default ProfileUser
