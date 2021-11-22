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
import UserTable from './UserTable/UserTable.jsx'
import TableToolbar from './TableToolbar/TableToolbar'


const AdminDashboard = () => {
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()
  
  // login status
  const adminUserLogin = useSelector((state) => state.adminUserLogin)
  const { adminUserInfo } = adminUserLogin

  const userList = useSelector((state) => state.userList)
  const { loading: loadingUserList, error: errorUserList, users } = userList

  useEffect(() => {
    document.title = 'Admin Dashboard | Ingenious Solution Group'

    if (adminUserInfo === null || adminUserInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/admin')
      return
    }
    dispatch(listUsers())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(listUsers())
    history.push('/admin/list-users')
  }

  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <TableToolbar rows={users} handleRefresh={() => handleRefresh()} columns={defaultColumns} title={'Bad Area Code'}>
          </TableToolbar>

          <Grid item xs={12}>
            {loadingUserList ? (
              <Loader />
            ) : errorUserList ? (
              <Message severity="error">{errorUserList}</Message>
            ) : (
              <UserTable
                columns={defaultColumns}
                data={createRows(users)}
                filter={false}
                selection={false}
                paging={true}
                editable={'always'}
              />
            )}
          </Grid>
        </Card>
      </Grid>
    </div>
  )
}

export default AdminDashboard