import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadData } from '../../../../actions/uploadCsvActions.js'
import {
  Typography,
  TextField,
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
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles1 from '../DataTablePhones/styles'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  formStep:{

    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  importData: {
      margin: "25px",
      display: "flex",
      alignItems: "center",
  },
  h3:{
      marginBottom:"10px",
  },
}))

const LinearStepper = ({ loader, loading, success }) => {
  const classes1 = useStyles1()
  const dispatch = useDispatch()

  const [uploadingCsv, setUploadingCsv] = useState(false)
  const [openCsv, setOpenCsv] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const uploadCsvHandle = async (file) => {
    //console.log('file', file)
    let formData = new FormData()
    formData.append('file', file)
    setUploadingCsv(true)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent < 100) {
          setPercentage({ percentage: percent })
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

  const getSteps = () => {
    return ['Upload CSV', 'Import Data', 'Info Import']
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={5} md={3} className={classes1.upload}>
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
                loader
              )}
              {percentage > 0 && (
                <LinearProgress
                  value={percentage}
                  variant="determinate"
                  valueBuffer={`${percentage}%`}
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
          </>
        )

      case 1:
        return (
          <>
          <Grid container xs={12} sm={12} justifyContent="center" className={classes.importData}>
          <Grid item xs={12} sm={5} md={3}>
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
            </Grid>
            <Grid item xs={12} sm={5} md={3}>
            <Button
              variant="outlined"
              className={commons.secondaryBtn}
              endIcon={<FaFileImport />}
              onClick={() => setOpenCsv(true)}
              style={{ width: '100%' }}
            >
              Import data
            </Button>
            </Grid>
            </Grid>
           
          </>
        )
      case 2:
        return (
          <>
          <Grid container xs={12} sm={12} justifyContent="space-around" className={classes.importData}>
          <Grid container xs={12} sm={12} justifyContent="space-around" className={classes.h3}>
          <h3>Report</h3>
          </Grid>
          
            <TextField
              id="address1"
              label="Total update phones"
              variant="outlined"
              placeholder="Enter Your Address 1"
              disabled = {true}
              margin="dense"
              name="address1"
            />
            <TextField
              id="address2"
              label="total new phones"
              variant="outlined"
              placeholder="Enter Your Address 2"
              disabled = {true}
              margin="dense"
              name="address2"
            />
            <TextField
              id="country"
              label="Total"
              variant="outlined"
              placeholder="Enter Your Country Name"
              disabled = {true}
              margin="dense"
              name="country"
            />
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
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
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
