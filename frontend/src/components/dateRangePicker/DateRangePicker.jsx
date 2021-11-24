import React, { useState } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  Grid,
  Popper,
  TextField,
  Fade,
  Paper,
  Backdrop,
  InputAdornment,
  IconButton,
  Tooltip,
  Button,
} from '@material-ui/core'
import { FaEraser } from 'react-icons/fa'

import { dateFormat } from '../../utils/format'

import layoutStyles from '../../components/DashboardLayout/styles'
import useStyles from './styles'
import moment from 'moment'

const DateRangePicker = ({ startValue, endValue, onChange, onClear }) => {
  const commons = layoutStyles()
  const classes = useStyles()

  const [range, setRange] = useState({
    start: startValue,
    end: endValue,
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOnChange = ({ name, value }) => {
    setRange({
      ...range,
      [name]: value,
    })
    if (onChange && typeof onChange === 'function')
      onChange({ ...range, [name]: value })
  }

  const handleOnOpen = (evt) => {
    setAnchorEl(evt.currentTarget)
    setOpen(true)
  }

  const handleOnClose = (evt) => {
    setOpen(false)
    setAnchorEl(null)
  }

  const handleOnClear = () => {
    setRange({
      start: '',
      end: '',
    })
    if (onClear && typeof onClear === 'function') onClear()
  }

  const handleTodayClick = () => {
    const today = new Date()
    const todayRange = {
      start: moment().subtract(1, 'day'),
      end: today,
    }

    setRange(todayRange)
    if (onChange && typeof onChange === 'function') onChange(todayRange)
  }

  const handleYesterdayClick = () => {
    const yesterday = moment().subtract(1, 'day')
    const yesterdayRange = {
      start: moment(yesterday).subtract(1, 'day'),
      end: yesterday,
    }

    setRange(yesterdayRange)
    if (onChange && typeof onChange === 'function') onChange(yesterdayRange)
  }

  const handleLast7Click = () => {
    const lastWeek = moment().subtract(7, 'day')
    const lastWeekRange = {
      start: lastWeek,
      end: new Date(),
    }

    setRange(lastWeekRange)
    if (onChange && typeof onChange === 'function') onChange(lastWeekRange)
  }

  const handleLast30Click = () => {
    const lastMonth = moment().subtract(30, 'day')
    const lastMonthRange = {
      start: lastMonth,
      end: new Date(),
    }

    setRange(lastMonthRange)
    if (onChange && typeof onChange === 'function') onChange(lastMonthRange)
  }

  const handleThisMonthClick = () => {
    const begin = moment().clone().startOf('month')
    const end = moment().clone().endOf('month')

    const thisMonthRange = {
      start: begin,
      end: end,
    }

    setRange(thisMonthRange)
    if (onChange && typeof onChange === 'function') onChange(thisMonthRange)
  }

  const handleLastMonthClick = () => {
    const begin = moment().subtract(1, 'months').clone().startOf('month')
    const end = moment().subtract(1, 'months').clone().endOf('month')

    const lastMonthRange = {
      start: begin,
      end: end,
    }

    setRange(lastMonthRange)
    if (onChange && typeof onChange === 'function') onChange(lastMonthRange)
  }

  return (
    <>
      <TextField
        className={classes.dataRange}
        margin='normal'
        label='Date Between'
        value={`${range?.start ? dateFormat(range.start) + ' -to-' : ''} ${
          range?.end ? dateFormat(range.end) : ''
        }`}
        fullWidth
        variant='outlined'
        onFocus={handleOnOpen}
        InputProps={{
          endAdornment:
            range.start && range.end ? (
              <InputAdornment position='end'>
                <Tooltip title='Clear'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleOnClear}
                    onMouseDown={handleOnClear}
                  >
                    <FaEraser />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : undefined,
        }}
      />
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleOnClose}
        invisible
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement='bottom-start'
        className={classes.picker}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Grid container justifyContent='flex-start'>
                <Grid item md={9} lg={10}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent='center'>
                      <KeyboardDatePicker
                        disableToolbar
                        inputVariant ='standard'
                        variant='static'
                        margin='normal'
                        format='yyyy-MM-dd'
                        className='dashboard-input'
                        label='Date start'
                        value={range.start}
                        onChange={(date) =>
                          handleOnChange({ name: 'start', value: date })
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <KeyboardDatePicker
                        disableToolbar
                        inputVariant ='standard'
                        variant='static'
                        margin='normal'
                        name='end'
                        format='yyyy-MM-dd'
                        className='dashboard-input'
                        label='Date end'
                        value={range.end}
                        onChange={(date) =>
                          handleOnChange({ name: 'end', value: date })
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  item
                  md={3}
                  lg={2}
                  justifyContent='flex-start'
                  alignItems='center'
                  className={classes.actionsWrapper}
                >
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleTodayClick}
                      fullWidth
                    >
                      Today
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleYesterdayClick}
                      fullWidth
                    >
                      Yesterday
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleLast7Click}
                      fullWidth
                    >
                      Last 7 days
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleLast30Click}
                      fullWidth
                    >
                      Last 30 days
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleThisMonthClick}
                      fullWidth
                    >
                      This month
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.secondaryBtn}
                      onClick={handleLastMonthClick}
                      fullWidth
                    >
                      Last month
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={12}>
                    <Button
                      className={commons.cancelBtn}
                      onClick={() => {
                        handleOnClose()
                        handleOnClear()
                      }}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default DateRangePicker
