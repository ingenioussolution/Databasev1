import React, { useEffect } from 'react'
import { Link, Tooltip, Grid } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import TableIcons from '../../../tableIcons.js'
import MaterialTable from 'material-table'
import PatchedPagination from '../../../PaginationError'
import { useDispatch, useSelector } from 'react-redux'
import { Export_Csv_File } from '../../../../actions/exportDataAction'
import { useHistory } from 'react-router-dom'
import Message from '../../../message/Message'
import Loader from '../../../Loader/Loader'
import Swal from 'sweetalert2'

const DownloadCsv = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const csvUrl = useSelector((state) => state.Export_Csv)
  const { loading, error, url } = csvUrl

  console.log('url', url)

  useEffect(() => {
    document.title = 'Download CSV | Ingenious Solution Group'
    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    dispatch(Export_Csv_File())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo, dispatch])

  const columnName = [
    {
      field: 'fileName',
      title: 'File Name',
    },

    {
      field: 'file',
      title: 'Download File',
      align: 'center',
      render: (rowData) => (
        <div>
          <Tooltip title="Download" style={{textAlign:'center'}}>
            <Link href={rowData.url} underline="hover" color="primary">
              <AttachFileIcon color="success" fontSize="large" />
            </Link>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'createdAt',
      title: 'Date',
      type: 'date',
      customSort: (a, b) => a.createdAt - b.createdAt,
    },
  ] 
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <MaterialTable
            title="List Export Csv File "
            style={{ padding: '20px' }}
            columns={columnName}
            data={url} 
            icons={TableIcons}
            options={{
              padding: 'default',
              sorting: true,
              pageSizeOptions: [5, 10],
              exportButton: {
                csv: true,
              },
              exportMenu: [
                {
                  label: 'Export CSV',
                  exportFunc: (cols, datas) =>
                    Export_Csv_File(cols, datas, 'myCsvFileName'),
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

export default DownloadCsv
