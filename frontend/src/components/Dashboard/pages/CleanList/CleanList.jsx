import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../../DataTable/DataTable'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { listPhoneClean } from '../../../../actions/phoneListCleanActions'
import Message from '../../../message/Message'

import useStyles from './styles'

const CleanList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const query = location.search ? new URLSearchParams(location.search) : false

  const listPhone = useSelector((state) => state.listPhoneClean)
  const {
    loading: loadingListClean,
    error: errorListClean,
    phoneClean,
  } = listPhone

  const clearFilters = {
    carrier: '',
    revenue: '',
    incomeSource: '',
    clicker: '',
    creditScore: '',
  }

  const [filterState, setFilterState] = useState(clearFilters)

  const filterDB = (phoneClean) => {
    return phoneClean?.filter((phone) => {
      if (filterState.carrier && !phone.carrier.includes(filterState.carrier))
        return false
      if (filterState.revenue !== '' && phone.revenue !== filterState.revenue)
        return false

      if (
        filterState.incomeSource !== '' &&
        phone.incomeSource !== filterState.incomeSource
      )
        return false
      if (filterState.clicker !== '' && phone.clicker !== filterState.clicker)
        return false

      if (
        filterState.creditScore !== '' &&
        phone.creditScore !== filterState.creditScore
      )
        return false

      return true
    })
  }

  const handleRefresh = () => {
    dispatch(listPhoneClean())
    setFilterState(clearFilters)
    history.push('/dashboard/list-data')
  }

  const handleFilterChange = (evt) => {
    const { value, name } = evt.target
    setFilterState({ ...filterState, [name]: value })
  }

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'
    dispatch(listPhoneClean())
  }, [dispatch, history])

  useEffect(() => {
    if (query) {
      for (const filter of query.keys()) {
        setFilterState({ ...filterState, [filter]: query.get(filter) })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingListClean])

  const filters = (
    <Grid container spacing={4} className={classes.filtersSection}>
      <Grid item xs={12} md={4}>
        <TextField
          margin="normal"
          label="Search by Carrier"
          type="carrier"
          name="carrier"
          fullWidth
          className="dashboard-input"
          variant="outlined"
          onChange={handleFilterChange}
          value={filterState.carrier || ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="revenue-label">Revenue</InputLabel>
          <Select
            labelId="revenue-label"
            name="revenue"
            onChange={handleFilterChange}
            label="Revenue"
            value={filterState.revenue}
          >
            <MenuItem value={''}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={'True'}>True</MenuItem>
            <MenuItem value={'False'}>False</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="clicker-label">creditScore</InputLabel>
          <Select
            labelId="creditScore-label"
            name="creditScore"
            onChange={handleFilterChange}
            label="creditScore"
            value={filterState.creditScore}
          >
            <MenuItem value={''}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={'no'}>No</MenuItem>
            <MenuItem value={'poor'}>Poor</MenuItem>
            <MenuItem value={'bad'}>Bad</MenuItem>
            <MenuItem value={'fair'}>Fair</MenuItem>
            <MenuItem value={'good'}>Good</MenuItem>
            <MenuItem value={'excellent'}>Excellent</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="clicker-label">Clicker</InputLabel>
          <Select
            labelId="clicker-label"
            name="clicker"
            onChange={handleFilterChange}
            label="clicker"
            value={filterState.clicker}
          >
            <MenuItem value={''}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={'True'}>True</MenuItem>
            <MenuItem value={'False'}>False</MenuItem>
            <MenuItem value={''}>Null</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="incomeSource-label">Income Source</InputLabel>
          <Select
            labelId="incomeSource-label"
            name="incomeSource"
            onChange={handleFilterChange}
            label="incomeSource"
            value={filterState.incomeSource}
          >
            <MenuItem value={''}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={'Benefits'}>Benefits</MenuItem>
            <MenuItem value={'Job Income'}>Job Income</MenuItem>
            <MenuItem value={'Self employed'}>Self employed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="lineType-label">Line Type</InputLabel>
          <Select
            //labelId='lineType-label'
            //name='lineType'
            onChange={handleFilterChange}
            label="lineType"
            // value={filterState.lineType}
          >
            <MenuItem value={''}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={'True'}>True</MenuItem>
            <MenuItem value={'False'}>False</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  return (
    <Grid container item xs={12}>
      <Snackbar
        open={errorListClean}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Message severity="error">{errorListClean}</Message>
      </Snackbar>
      <DataTable
        title="Ingenious Solution Group"
        loading={loadingListClean}
        columns={defaultColumns}
        rows={createRows(filterDB(phoneClean))}
        cantRowsPerPage={10}
        rowsIdentity="phone"
        handleRefresh={() => handleRefresh()}
        filters={filters}
      />
    </Grid>
  )
}

export default CleanList
