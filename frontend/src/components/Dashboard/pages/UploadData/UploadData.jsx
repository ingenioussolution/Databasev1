import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { uploadData } from '../../../../actions/uploadCsvActions.js'
import { listPhoneTemporalData } from '../../../../actions/tempTableActions.js'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import clsx from 'clsx'
//import { DropzoneDialog } from 'material-ui-dropzone'
//import { FaUpload } from 'react-icons/fa'
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
<<<<<<< HEAD
// import MaterialTable from 'material-table'
// import { TablePagination } from '@material-ui/core'
// import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
// import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
// import tableIcons from '../../../tableIcons'
=======
import MaterialTable from 'material-table'
import { TablePagination } from '@material-ui/core'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import tableIcons from '../../../tableIcons'
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
import dataStyle from '../../../DataTable/styles'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from '../DataTablePhones/styles'

const UploadData = () => {
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()
  const dispatch = useDispatch()
  const history = useHistory()

<<<<<<< HEAD
  //const tableRef = React.createRef()
=======
  const tableRef = React.createRef()
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

  // const [uploadingCsv, setUploadingCsv] = useState(false)
  // const [openCsv, setOpenCsv] = useState(false)

  // login status
<<<<<<< HEAD
  //test 
=======
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const uploadCsvData = useSelector((state) => state.uploadCsvData)
  const { loading, success } = uploadCsvData

  const listTemporalData = useSelector((state) => state.listPhoneTemp)
<<<<<<< HEAD
  const { page, count } = listTemporalData
=======
  const { tempListPhones, page, count } = listTemporalData
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
  const [pageState, setPageState] = useState(page || 0)
 
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
    dispatch(listPhoneTemporalData(pageState))
<<<<<<< HEAD
  }, [dispatch, userInfo])
=======
  }, [dispatch])
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

  // const PaginationTemp = () => {
  //   return (
  //     <TablePagination
  //       //rowsPerPageOptions={[10]}
  //       rowsPerPage={10}
  //       component="div"
  //       count={pages || 0}
  //       page={pageState}
  //       onPageChange={handleChangePage}
  //     />
  //   )
  // }

  // const handleChangePage = (event, newPage) => {
  //   console.log('newPage', newPage)
  //   setPageState(newPage)
  // }

  //   const uploadCsvHandle = async (file) => {
  //     let formData = new FormData()
  //     formData.append('file', file)
  //     setUploadingCsv(true)

  //     try {
  //       dispatch(uploadData(formData))
  //       setUploadingCsv(false)
  //     } catch (error) {
  //       console.error(error)
  //       setUploadingCsv(false)
  //     }
  //   }

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
                  onClick={()=>dispatch(listPhoneTemporalData(pageState))}>
                    Refresh Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                <h6>Total Temporal Table: {count === undefined ? 0 : count}</h6>
                </Grid>

                {/*<Grid item xs={12} sm={3} md={2}>
                  {!loading ? (
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaUpload />}
                      onClick={() => setOpenCsv(true)}
                      style={{ width: '100%' }}
                    >
                      upload file
                    </Button>
                  ) : (
                    <Loader />
                  )}
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <DropzoneDialog
                    acceptedFiles={['.csv']}
                    cancelButtonText={'cancel'}
                    submitButtonText={'submit'}
                    maxFileSize={50000000}
                    filesLimit={1}
                    open={openCsv}
                    onClose={() => setOpenCsv(false)}
                    onSave={(files) => {
                      uploadCsvHandle(files[0])
                      setOpenCsv(false)
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                    clearOnUnmount={true}
                  />
                  {uploadingCsv && <Loader />}
                </Grid>*/}
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
