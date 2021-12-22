import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Card } from '@material-ui/core'
import Swal from 'sweetalert2'
import dataStyle from '../../DataTable/styles'
import UserTable from './UserTable/UserTable.jsx'

const AdminDashboard = () => {
  const classesTable = dataStyle()

  const history = useHistory()

  // login status
  const adminUserLogin = useSelector((state) => state.adminUserLogin)
  const { adminUserInfo } = adminUserLogin

  useEffect(() => {
    document.title = 'Admin Dashboard | Ingenious Solution Group'

    if (adminUserInfo === null || adminUserInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/admin')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Grid item xs={12}>
            <UserTable />
          </Grid>
        </Card>
      </Grid>
    </div>
  )
}

export default AdminDashboard
