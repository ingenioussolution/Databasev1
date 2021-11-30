import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { uploadData } from '../../../../actions/uploadCsvActions.js'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import Loader from '../../../Loader/Loader'
//import { DropzoneDialog } from 'material-ui-dropzone'
//import { FaUpload } from 'react-icons/fa'
import LinearStepper from './LinearSteper'
import {
  Button,
  Grid,
  Toolbar,
  Card,
  CssBaseline,
  Container,
  Paper,
  Box,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import tableIcons from "../../../tableIcons"
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

  const [uploadingCsv, setUploadingCsv] = useState(false)
  const [openCsv, setOpenCsv] = useState(false)

  // login status
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const uploadCsvData = useSelector((state) => state.uploadCsvData)
  const { loading, success } = uploadCsvData

  useEffect(() => {
    document.title = 'Upload New Data | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo])

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
                    <LinearStepper loader={<Loader/>} loading = {loading} success = {success}/>
                  </Paper>
                </Container>

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
          <MaterialTable
            style={{ padding: '20px' }}
            title=""
            columns={defaultColumns}
            icons={tableIcons}
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
            />
        </Card>
      </Grid>
    </div>
  )
}

export default UploadData
