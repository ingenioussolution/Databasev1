import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadData } from '../../../../actions/uploadCsvActions.js'
import { ImportData } from '../../../../actions/phoneListCleanActions'
import PropTypes from 'prop-types'
import {
  //Typography,
  //TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  LinearProgress,
 // Box,
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
import useStyles1 from '../DataTablePhones/styles'
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

  importData: {
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

const LinearStepper = ({ loader, loading, success, count }) => {
  const classes1 = useStyles1()
  const dispatch = useDispatch()

  const [uploadingCsv, setUploadingCsv] = useState(false)
  const [openCsv, setOpenCsv] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [progress, setProgress] = React.useState(0)

  const importReducer = useSelector((state) => state.importData)
  const {
    loading: loadingImport,
    success: successImport,
    error: errorImport,
  } = importReducer

  const uploadCsvHandle = async (file) => {
    let formData = new FormData()
    formData.append('file', file)
    setUploadingCsv(true)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent

        console.log('total', loaded, total, progressEvent)
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent <= 100) {
          setUploadPercentage(percent)
        }
      },
    }

    try {
      dispatch(uploadData(formData, options))

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

  console.log('uploadPercentage: ', uploadPercentage)

  const ImportDataCSV = () => {
    // setOpenCsv(true)
    if(count){
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
          dispatch(ImportData()) 
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops... There is no Data to Import',
        text: 'Please, Go back and Upload Data to continue',
      })
    }
    
  }

  const getSteps = () => { 
    return ['Upload CSV', 'Import Data', 'Info Import'] 
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
                  disabled = {count ? true : false}
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
                maxFileSize={5000000000}
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
            className={classes.importData}
          >
            {/*<Grid item xs={12} sm={5} md={3}>
            <TextField
              id="email"
              label="Enter Limit"
              variant="outlined"
              placeholder="Enter limit import"
              fullWidth
              type = 'number'
              margin="dense"
              name="emailAddress"
            />
        </Grid>*/}
            <Grid item xs={12} sm={5} md={3}>
              {!loadingImport ? (
                <Button
                  variant="outlined"
                  className={commons.secondaryBtn}
                  endIcon={<FaFileImport />}
                  onClick={() => ImportDataCSV()}
                  style={{ width: '100%' }}
                >
                  Import data
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
              className={classes.importData}
            >
              <Grid
                container
                xs={12}
                sm={12}
                justifyContent="space-around"
                className={classes.h3}
                
              >
                <h3>Report In Progress no complete yet</h3>
                
              </Grid>

              {/* 
              <TextField
                
                id="address1"
                label="Total update phones"
                variant="outlined"
                placeholder="Enter Your Address 1"
                disabled={true}
                margin="dense"
                name="address1"
              />
              <TextField
                id="address2"
                label="total new phones"
                variant="outlined"
                placeholder="Enter Your Address 2"
                disabled={true}
                margin="dense"
                name="address2"
              />
              <TextField
                id="country"
                label="Total"
                variant="outlined"
                placeholder="Enter Your Country Name"
                disabled={true}
                margin="dense"
                name="country"
              />
              */}
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

  const isStepOptional = (step) => {
    return step === 1 || step === 2
  }

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep))
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep])
    }
    setActiveStep(activeStep + 1)
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

export default LinearStepper
