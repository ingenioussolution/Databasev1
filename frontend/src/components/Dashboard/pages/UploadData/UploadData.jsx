import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPhoneTemporalData } from '../../../../actions/tempTableActions.js'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import HorizontalLoader from '../../../horizontalLoader/HorizontalLoader'
import LinearStepper from './LinearSteper'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import {
  PHONE_TEMP_LIST_RESET,
  PHONE_TEMP_LIST_FAIL,
  PHONE_TEMP_LIST_SUCCESS,
  PHONE_TEMP_LIST_REQUEST,
} from '../../../../constants/tempTableConstants'
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
//import { TablePagination } from '@material-ui/core'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import tableIcons from '../../../tableIcons'
import dataStyle from '../../../DataTable/styles'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from '../DataTablePhones/styles'

const UploadData = () => {
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

  const tableRef = React.createRef()

  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const uploadCsvData = useSelector((state) => state.uploadCsvData)
  const { loading, success } = uploadCsvData

  const listTemporalData = useSelector((state) => state.listPhoneTemp)
  const { loading: loadingTable, error: errorTable } = listTemporalData

  const listTemporalCount = useSelector((state) => state.listPhoneCount)
  const { count } = listTemporalCount

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    document.title = 'Upload New Data | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo])

  useEffect(() => {
    dispatch(listPhoneTemporalData())
  }, [dispatch, userInfo])

  const dataPagination = (query) =>
    new Promise((resolve, reject) => {
      if (userInfo === null || userInfo === undefined) {
        history.push('/')
        return
      } else {
        dispatch({
          type: PHONE_TEMP_LIST_REQUEST,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        let url = '/data-temporal/get-temp?'
        url += '&pageNumber=' + (query.page + 1)

        console.log('URL with filters: ', url)
        console.log('Query: ', query)

        axios
          .get(url, config)
          .catch((error) => {
            console.log(error.response)
            dispatch({
              type: PHONE_TEMP_LIST_FAIL,
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
          type: PHONE_TEMP_LIST_SUCCESS,
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
      dispatch({ type: PHONE_TEMP_LIST_RESET })
      setSuccessMsg('Search Complete')
    }
    if (errorTable) setErrorMsg(errorTable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorTable, loadingTable])

  const updateData = () => {
    dispatch(listPhoneTemporalData())
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
              <h3>Upload New Data</h3>
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
                    <LinearStepper
                      loader={<HorizontalLoader />}
                      loading={loading}
                      success={success}
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
              title="Upload Temporal Data"
              columns={defaultColumns}
              icons={tableIcons}
              data={dataPagination}
              options={{
                search: false,
                headerStyle: {
                  backgroundColor: "#e3f2fd",
                  color: "#000",
                  
                },
              }}
              tableRef={tableRef}
              
              //components={{ Pagination: PaginationTemp }}
            />
          )}
        </Card>
      </Grid>
    </div>
  )
}

export default UploadData
