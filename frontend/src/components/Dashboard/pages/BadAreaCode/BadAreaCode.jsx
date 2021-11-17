import React, { useEffect, useState } from 'react'
import TableData from './Table/Table'
import { getAreaCode } from '../../../../actions/badAreaCodeAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  defaultColumns,
  createRows,
} from '../../../../utils/dataModels/BadAreaCodeDataModel'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import { Grid, Button, Card } from '@material-ui/core'
import Swal from 'sweetalert2'

import dataStyle from '../../../DataTable/styles'
import DataTableToolbar from './TableToolbar/TableToolbar'

const BadAreaCode = () => {
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

  const [pageState, setPageState] = useState(1 || 0)
  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const listBadArea = useSelector((state) => state.listBadArea)
  const { loading, error, badArea } = listBadArea

  useEffect(() => {
    document.title = 'Bad Area Code | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    dispatch(getAreaCode())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, userInfo])

  const handleChangePage = (event, newPage) => {
    setPageState(newPage)
  }

  const handleRefresh = () => {
    dispatch(getAreaCode())
    history.push('/dashboard/bad-area-code')
  }

  // editable value ['always' 'never' 'onUpdate' 'onAdd']
  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <DataTableToolbar rows={badArea} handleRefresh={() => handleRefresh()} columns={defaultColumns} title={'Bad Area Code'}>
          </DataTableToolbar>

          <Grid item xs={12}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message severity="error">{error}</Message>
            ) : (
              <TableData
                columns={defaultColumns}
                data={createRows(badArea)}
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

export default BadAreaCode
