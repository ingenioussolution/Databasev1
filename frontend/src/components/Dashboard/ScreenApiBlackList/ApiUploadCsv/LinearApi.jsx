import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upload_Api_Csv, Clean_Look_Up, Import_Clean_Data} from '../../../../actions/apiBlackListAction.js'
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  LinearProgress,
} from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import {
  FaUpload,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaFileImport,
} from 'react-icons/fa'
import Swal from 'sweetalert2'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles1 from '../../pages/DataTablePhones/styles'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  formStep: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  Import_Clean_Data: {
    margin: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  h3: {
    marginBottom: '10px',
  },
  linear: {
    color: 'blue',
  },
}))

const LinearApi = ({ loader, loading, success, count }) => {
  const classes1 = useStyles1()
  const dispatch = useDispatch()

  const [uploadingCsv, setUploadingCsv] = useState(false)
  const [openCsv, setOpenCsv] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const importReducer = useSelector((state) => state.R_Import_Clean_Data)
  const {
    loading: loadingImport,
    // success: successImport,
    // error: errorImport,
  } = importReducer

 const Look_Up = useSelector ((state)=> state.R_Clean_Look_Up)
 const {loading:loadingClean, success: successClean, error: errorClean} = Look_Up

  const uploadCsvHandle = async (file) => {
    let formData = new FormData()
    formData.append('file', file)
    setUploadingCsv(true)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent

        // console.log('total', loaded, total, progressEvent)
        let percent = Math.floor((loaded * 100) / total)
        // console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent <= 100) {
          setUploadPercentage(percent)
        }
      },
    }

    try {
      dispatch(upload_Api_Csv(formData, options))

      setUploadingCsv(false)
    } catch (error) {
      console.error(error)
      setUploadingCsv(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      setUploadPercentage(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadPercentage, loading])

  const Import_Clean_DataCSV = () => {
    // setOpenCsv(true)
    if (count) {
      Swal.fire({
        title: 'You want Import Data',
        text: 'Please Continue',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(Import_Clean_Data())
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops... There is no Data to Import',
        text: 'Please, Go back and Upload Data to continue',
      })
    }
  }

  const Clean_Data_CSV = () => {
    // setOpenCsv(true)
    if (count) {
      Swal.fire({
        title: 'Blacklist Phone Lookup',
        text: 'Please Continue',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(Clean_Look_Up())
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops... There is no Data to Import',
        text: 'Please, Go back and Upload Data to continue',
      })
    }
  }

  const getSteps = () => {
    return ['Upload CSV', 'Blacklist Lookup', 'Import Loop-Up Data']
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={5} md={3} className={classes1.upload}>
              {!loading ? (
                <Button
                  variant="outlined"
                  className={commons.secondaryBtn}
                  endIcon={<FaUpload />}
                  onClick={() => setOpenCsv(true)}
                  style={{ width: '100%' }}
                  disabled={count ? true : false}
                >
                  upload file
                </Button>
              ) : (
                <LinearProgress
                  style={{ backgroundColor: '#e3f2fd' }}
                  value={uploadPercentage}
                  //variant="determinate"
                  valueBuffer={`${uploadPercentage}%`}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <DropzoneDialog
                acceptedFiles={['.csv']}
                cancelButtonText={'cancel'}
                submitButtonText={'submit'}
                maxFileSize={10000000}
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
              {uploadingCsv && loader}
            </Grid>
          </Grid>
        )

      case 1:
        return (
          <Grid
            container
            xs={12}
            sm={12}
            justifyContent="center"
            className={classes.Import_Clean_Data}
          >
            <Grid item xs={12} sm={5} md={3}>
              {!loadingClean ? (
                <Button
                  variant="outlined"
                  className={commons.secondaryBtn}
                  endIcon={<FaFileImport />}
                  onClick={() => Clean_Data_CSV()}
                  style={{ width: '100%' }}
                >
                  Loop Up
                </Button>
              ) : (
                loader
              )}
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <>
            <Grid
              container
              xs={12}
              sm={12}
              justifyContent="space-around"
              className={classes.Import_Clean_Data}
            >
            <Grid item xs={12} sm={5} md={3}>
            {!loadingImport ? (
              <Button
                variant="outlined"
                className={commons.secondaryBtn}
                endIcon={<FaFileImport />}
                onClick={() => Import_Clean_DataCSV()}
                style={{ width: '100%' }}
              >
                Import Loop Up
              </Button>
            ) : (
              loader
            )}
          </Grid>

             
            </Grid>
          </>
        )

      default:
        return 'unknown step'
    }
  }

  const commons = layoutStyles()
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0)
  const [skippedSteps, setSkippedSteps] = useState([])
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep))
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {}
          const stepProps = {}

          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {activeStep === steps.length ? (
        setActiveStep(0)
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            spacing={1}
            container
            justifyContent="center"
            className={classes1.actionsContainer}
          >
            {getStepContent(activeStep)}

            <Grid container xs={12} sm={12} justifyContent="space-around">
              <Grid item xs={12} sm={3} md={2}>
                <Button
                  className={commons.secondaryBtn}
                  endIcon={<FaArrowAltCircleLeft />}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <Button
                  className={commons.successBtn}
                  variant="outlined"
                  endIcon={<FaArrowAltCircleRight />}
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  )
}

export default LinearApi
