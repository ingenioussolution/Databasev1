import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  defaultColumns,
  createRows,
} from '../../../utils/dataModels/UserDataModel'
import Loader from '../../Loader/Loader'
import Message from '../../message/Message'
import { Grid, Button, Card } from '@material-ui/core'
import Swal from 'sweetalert2'
import { listUsers } from '../../../actions/userActions'
import dataStyle from '../../DataTable/styles'
//import DataTableToolbar from './TableToolbar/TableToolbar'

const AdminDashboard = () => {
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

  // login status
  const adminUserLogin = useSelector((state) => state.adminUserLogin)
  const { adminUserInfo } = adminUserLogin

  useEffect(() => {
    document.title = 'Admin Dashboard | Ingenious Solution Group'

    if (adminUserInfo === null || adminUserInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    dispatch(listUsers())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, adminUserInfo])

  const handleRefresh = () => {
    dispatch(listUsers())
    history.push('/dashboard/bad-area-code')
  }

  return <div></div>
}

export default AdminDashboard