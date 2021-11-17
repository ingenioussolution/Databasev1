import React, { useEffect } from 'react'
import TableData from '../../../Table/Table'
import {
  getAreaCode,
} from '../../../../actions/badAreaCodeAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {defaultColumns} from '../../../../utils/dataModels/BadAreaCodeDataModel'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import { Grid } from '@material-ui/core'
import Swal from 'sweetalert2'


const BadAreaCode = () => {
  const dispatch = useDispatch()
  const history = useHistory()
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


// editable value ['always' 'never' 'onUpdate' 'onAdd']
  return (
    <Grid item xs={12}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <TableData
          title={'Bad Area'}
          columns={defaultColumns}
          data={badArea}
          filter = {false}
          selection = {false}
          paging = {true}
          editable = {"always"}
        />
      )}
    </Grid>
  )
}

export default BadAreaCode
