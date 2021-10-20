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

  console.log(phoneClean)
  const clearFilters = {
    status: '',
  }

  const [filterState, setFilterState] = useState(clearFilters)

  const filterDB = (phoneClean) => {
    return phoneClean?.filter((phone) => {
      if (filterState.carrier && !phone.carrier.includes(filterState.carrier))
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
          //type='carrier'
          // name='carrier'
          fullWidth
          className="dashboard-input"
          variant="outlined"
          onChange={handleFilterChange}
          // value={filterState.carrier || ''}
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
        <TextField
          margin="normal"
          label="Search by Revenue"
          // type='carrier'
          // name='carrier'
          fullWidth
          className="dashboard-input"
          variant="outlined"
          onChange={handleFilterChange}
          //value={filterState.wireless || ''}
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
        <TextField
          margin="normal"
          label="Search by Credit Score"
          //  type='carrier'
          //  name='carrier'
          fullWidth
          className="dashboard-input"
          variant="outlined"
          onChange={handleFilterChange}
          // value={filterState.wireless || ''}
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
          <InputLabel id="clicker-label">Clicker</InputLabel>
          <Select
            //  labelId='clicker-label'
            // name='clicker'
            onChange={handleFilterChange}
            label="clicker"
            // value={filterState.clicker}
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
          <InputLabel id="incomeSource-label">Income Source</InputLabel>
          <Select
            // labelId='incomeSource-label'
            name="incomeSource"
            onChange={handleFilterChange}
            // label='incomeSource'
            //value={filterState.incomeSource}
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
