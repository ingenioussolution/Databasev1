import React, { useEffect } from 'react'
import TableIcons from '../../../tableIcons.js'
import MaterialTable from 'material-table'
import PatchedPagination from '../../../PaginationError'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUserAsAdmin } from '../../../../actions/userActions'
import Message from '../../../message/Message'
import Loader from '../../../Loader/Loader'
import { ExportCsv } from '@material-table/exporters'
import Swal from 'sweetalert2'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link, Tooltip, Grid, Card } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ToolbarUser from '../TableToolbar/TableToolbar'
import dataStyle from '../../../DataTable/styles'

const UserTable = () => {
  const classesTable = dataStyle()
  const history = useHistory()
  const columnName = [
    { field: 'firstName', title: 'First Name' },
    {
      field: 'email',
      title: 'Email',
    },
    {
      field: 'username',
      title: 'User Name',
    },
    {
      field: 'isAdmin',
      title: 'Admin',
    },
    {
      title: 'Actions',
      field: 'id',
      render: (rowData) => (
        <div>
          <Tooltip title="Edit">
            <Link
              href={`/admin/list-users/${rowData._id}/edit`}
              style={{ paddingRight: '15px' }}
            >
              <EditIcon color="action" />
            </Link>
          </Tooltip>

          <Tooltip title="Delete">
            <Link onClick={() => handleRowDelete(rowData._id)}>
              <DeleteIcon color="secondary" />{' '}
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ]
  const userList = useSelector((state) => state.userList)
  const { loading: loadingUserList, error: errorUserList, users } = userList
  const userDelete = useSelector((state) => state.userDelete)
  const { success: deleteSuccess } = userDelete

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  // Delete User
  const handleRowDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure? ',
      text: 'You want to delete this row! ',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAsAdmin(id))
      }
    })
  }

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(listUsers())
      history.push('/admin/list-users')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess, dispatch])

  return (
    <Grid container item xs={12}>
      <Card className={classesTable.mainWrapper}>
        <ToolbarUser AddUser={'/admin/list-users/add'}></ToolbarUser>
      </Card>
      <Grid item xs={12}>
        {loadingUserList ? (
          <Loader />
        ) : errorUserList ? (
          <Message severity="error">{errorUserList}</Message>
        ) : (
          <MaterialTable
            title=""
            style={{ padding: '20px' }}
            columns={columnName}
            data={users}
            icons={TableIcons}
            options={{
              //exportButton: true,
              //exportAllData: true,
              padding: 'default',
              pageSizeOptions: [5, 10, 20],
              exportButton: {
                csv: true,
              },
              exportMenu: [
                {
                  label: 'Export CSV',
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, 'myCsvFileName'),
                },
              ],
            }}
            components={{
              Pagination: PatchedPagination,
            }}
            localization={{
              toolbar: {
                exportCSVName: 'Export Csv file',
              },
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default UserTable
