import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_Clean_Data } from '../../../../actions/apiBlackListAction'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import HorizontalLoader from '../../../horizontalLoader/HorizontalLoader'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import LinearApi from './LinearApi'
import {
  PHONE_API_BL_LIST_RESET,
  PHONE_API_BL_LIST_FAIL,
  PHONE_API_BL_LIST_SUCCESS,
  PHONE_API_BL_LIST_REQUEST,
} from '../../../../constants/apiBlackListConstants'
import { FaSyncAlt } from 'react-icons/fa'
import axios from 'axios'
import {
  Grid,
  Toolbar,
  Card,
  CssBaseline,
  Container,
  Paper,
  Box,
  Button,
  Snackbar,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import {
  createRows,
  defaultColumns,
} from '../../../../utils/dataModels/ApiBlackListModel'
import tableIcons from '../../../tableIcons'
import dataStyle from '../../../DataTable/styles'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from '../../pages/DataTablePhones/styles'

const ApiUploadCsv = () => {
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

  const tableRef = React.createRef()

  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const uploadCsvData = useSelector((state) => state.R_Upload_Api_Csv)
  const { loading: loadingCsv, success: successCsv } = uploadCsvData

  const listApiData = useSelector((state) => state.list_API_Data)
  const { loading: loadingTable, error: errorTable, count } = listApiData

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    document.title = 'Upload Clean Data | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    dispatch(list_Clean_Data())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, dispatch, userInfo])

  const dataPagination = (query) =>
    new Promise((resolve, reject) => {
      if (userInfo === null || userInfo === undefined) {
        history.push('/')
        return
      } else {
        dispatch({
          type: PHONE_API_BL_LIST_REQUEST,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        let url = '/api-black-list?'
        url += '&pageNumber=' + (query.page + 1)

        url += '&user=' + `${userInfo._id}`

        console.log('URL with filters: ', url)
        console.log('Query: ', query)

        axios
          .get(url, config)
          .catch((error) => {
            console.log(error.response)
            dispatch({
              type: PHONE_API_BL_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          })
          .then((result) => {
            if (result.data !== undefined) {
              resolve({
                data: createRows(result.data.data),
                page: result.data.page - 1,
                totalCount: result.data.totalPages,
              })
            } else {
              ;<Loader />
            }
            setDataTable(result)
          })

        dispatch({
          type: PHONE_API_BL_LIST_SUCCESS,
          payload: dataTable,
        })
      }
    })

    const handleAlertClose = () => {
        setErrorMsg('')
        setSuccessMsg('')
      }
      //----- message search complete
      useEffect(() => {
        if (loadingTable) {
          dispatch({ type: PHONE_API_BL_LIST_RESET })
          setSuccessMsg('Search Complete')
        }
        if (errorTable) setErrorMsg(errorTable)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [errorTable, loadingTable])
    
      const updateData = () => {
        dispatch(list_Clean_Data())
        tableRef.current.onQueryChange()
      }

  return (
    <div>
    <Grid container item xs={12}>
      <Card className={classesTable.mainWrapper}>
        <Snackbar
          open={errorMsg ? true : false}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Message severity="error">{errorMsg}</Message>
        </Snackbar>
        <Snackbar
          open={successMsg ? true : false}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Message severity="success">{successMsg}</Message>
        </Snackbar>
        <Toolbar className={clsx(classes.tableHeader)}>
          <Grid container justifyContent='center'>
            <h3>Load Data By Clean</h3>
          </Grid>
        </Toolbar>
      </Card>
      <Card className={classesTable.mainWrapper}>
        <Toolbar className={clsx(classes.tableHeader)}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              spacing={1}
              container
              justifyContent="space-around"
              className={classes.actionsContainer}
            >
              <CssBaseline />
              <Container component={Box} p={4}>
                <Paper component={Box} p={3}>
                  <LinearApi
                    loader={<HorizontalLoader />}
                    loading={loadingCsv}
                    success={successCsv}
                    count={count}
                  />
                </Paper>
              </Container>
              <Grid item xs={12} sm={3} md={2}>
                <Button
                  variant="outlined"
                  className={commons.secondaryBtn}
                  onClick={updateData}
                  endIcon={<FaSyncAlt />}
                >
                  View Data
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <h6>
                  Total Temporal Table: {count === undefined ? 0 : count}
                </h6>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        {loadingTable ? (
          <Loader />
        ) : errorTable ? (
          <Message severity="error">{errorTable}</Message>
        ) : (
          <MaterialTable
            style={{ padding: '20px' }}
            title="Upload Api Black List Data"
            columns={defaultColumns}
            icons={tableIcons}
            data={dataPagination}
            options={{
              pageSizeOptions: [5, 10],
              search: false,
              headerStyle: {
                backgroundColor: "#e3f2fd",
                color: "#000",
                
              },
            }}
            tableRef={tableRef}
            
          />
        )}
      </Card>
    </Grid>
  </div>
  )
}

export default ApiUploadCsv
