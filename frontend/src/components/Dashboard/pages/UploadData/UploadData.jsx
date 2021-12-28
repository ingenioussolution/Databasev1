import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPhoneTemporalData } from '../../../../actions/tempTableActions.js'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import HorizontalLoader from '../../../horizontalLoader/HorizontalLoader'
import LinearStepper from './LinearSteper'
import {
  Grid,
  Toolbar,
  Card,
  CssBaseline,
  Container,
  Paper,
  Box,
  Button,
} from '@material-ui/core'
// import MaterialTable from 'material-table'
// import { TablePagination } from '@material-ui/core'
// import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
// import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
// import tableIcons from '../../../tableIcons'
import dataStyle from '../../../DataTable/styles'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from '../DataTablePhones/styles'

const UploadData = () => {
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

  //const tableRef = React.createRef()

  // const [uploadingCsv, setUploadingCsv] = useState(false)
  // const [openCsv, setOpenCsv] = useState(false)

  // login status

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const uploadCsvData = useSelector((state) => state.uploadCsvData)
  const { loading, success } = uploadCsvData

  const listTemporalData = useSelector((state) => state.listPhoneTemp)
  const { count } = listTemporalData
  const page = 0
 
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
    dispatch(listPhoneTemporalData(page))
  }, [dispatch, userInfo])

  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container>
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
                  <Button variant="outlined" 
                  className={commons.secondaryBtn}
                  onClick={()=>dispatch(listPhoneTemporalData(page))}>
                    Refresh Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                <h6>Total Temporal Table: {count === undefined ? 0 : count}</h6>
                </Grid>

                
              </Grid>
            </Grid>
          </Toolbar>
         {/* <MaterialTable
            style={{ padding: '20px' }}
            title="Upload Temporal Data"
            columns={defaultColumns}
            icons={tableIcons}
           // data={tempListPhones}
            options={{
              exportButton: false,
              exportAllData: false,
              paging: true,
              pageSize: 10,
              selection: false,
              padding: 'default',
              pageSizeOptions: [5, 10],
              search: false,
            }}
            tableRef={tableRef}
           // components={{ Pagination: PaginationTemp }}
          />*/}
        </Card>
      </Grid>
    </div>
  )
}

export default UploadData
