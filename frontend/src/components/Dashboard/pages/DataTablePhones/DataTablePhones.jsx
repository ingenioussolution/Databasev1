import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from '../../../tableIcons.js'
import PatchedPagination from '../../../PaginationError'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  PHONE_CLEAN_LIST_REQUEST,
  PHONE_CLEAN_LIST_SUCCESS,
  PHONE_CLEAN_LIST_FAIL,
  PHONE_CLEAN_LIST_RESET,
} from '../../../../constants/phonesListClean'
import { exportData } from '../../../../actions/exportDataAction'
import Swal from 'sweetalert2'
import moment from 'moment'
import {
  Button,
  Grid,
  Tooltip,
  Toolbar,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  TextField,
  Snackbar,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'
import dataStyle from '../../../DataTable/styles'
import clsx from 'clsx'
import { FaFileDownload, FaFileExport, FaSearch } from 'react-icons/fa'

import Loader from '../../../Loader/Loader'
import DateRangePicker from '../../../dateRangePicker/DateRangePicker'
import Message from '../../../message/Message'

const DataTablePhones = () => {
  const tableRef = React.createRef()

  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()

  const [dataTable, setDataTable] = useState([])
  const [exportCSV, setExportCSV] = useState(false)
  const [queryExport, setQueryExport] = useState('')
  //const [filter, setFilter] = useState('')
  //const [areaCode, setAreaCode] = useState(false)
  const [checkGroup, setCheckGroup] = useState({
    masterCCC: false,
    areaCode: false,
    notCCC: false,
    clicker: false,
    converter: false,
    dateUpdate: false,
    dateCreate: false,
  })

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const listExportData = useSelector((state) => state.listExportData)
  const { loading, error: exportError, success } = listExportData

  const listData = useSelector((state) => state.listPhoneClean)
  const { error: errorData, success: successData } = listData


  const [totalProcessPages, setTotalPages] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [filterState, setFilterState] = useState({
    startUpdateDate: '',
    endUpdateDate: '',
    startDate: '',
    endDate: '',
    carrier: '',
    name: '',
    source: '',
    masterCCC: '',
    notCCC: '',
    phone: '',
    areaCode: '',
    repliers: '',
    clicker: '',
    converter: '',
  })

  const handleAlertClose = () => {
    setErrorMsg('')
    setSuccessMsg('')
  }

  //------------ UseEffect---------
  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo, dispatch])

  // const dataPagination = (query) =>
  //   new Promise((resolve, reject) => {
  //     if (userInfo === null || userInfo === undefined) {
  //       history.push('/')
  //       return
  //     } else {
  //       dispatch({
  //         type: PHONE_CLEAN_LIST_REQUEST,
  //       })

  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }

  //       let url = '/phoneslist?'
  //       let urlExport = 'export-csv?'
  //       urlExport += '&user=' + userInfo._id
  //       let urlCount = 'count-filter?'

  //       url += '&pageNumber=' + (query.page + 1)

  //       //searching area Code
  //       if (query.search) {
  //         url += '&q=' + query.search
  //         urlExport += '&q=' + query.search
  //       }

  //       //filtering
  //       if (query.filters.length) {
  //         const filter = query.filters.map((filter) => {
  //           //return `&${filter.column.field}${filter.operator}${filter.value}`
  //           let filterType = `${filter.column.field}`
  //           let valueFilter = `${filter.value}`

  //           console.log('valueFilter', valueFilter)

  //           let encoded = encodeURIComponent(valueFilter)
  //           console.log('encoded filter', encoded)
  //           return '&' + filterType + `${filter.operator}` + encoded
  //         })
  //         url += filter.join('')
  //         urlExport += filter.join('')
  //       }

  //       //sorting
  //       if (query.orderBy) {
  //         url += '&sort='(query.orderBy.field) + '&order='(query.orderDirection)
  //       }

  //       if (areaCode) {
  //         url += '&areaCode=' + true
  //         urlExport += '&areaCode=' + true
  //       }

  //       if (filterState.startDate !== '') {
  //         url += '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
  //         urlExport +=
  //           '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
  //       } else {
  //         url += '&start='
  //         urlExport += '&start='
  //       }

  //       if (filterState.endDate !== '') {
  //         url += '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
  //         urlExport +=
  //           '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
  //       } else {
  //         url += '&end='
  //         urlExport += '&end='
  //       }

  //       console.log('URL with filters: ', url)
  //       console.log('Query: ', query)

  //       axios
  //         .get(url, config)
  //         .catch((error) => {
  //           console.log(error.response)
  //           dispatch({
  //             type: PHONE_CLEAN_LIST_FAIL,
  //             payload:
  //               error.response && error.response.data.message
  //                 ? error.response.data.message
  //                 : error.message,
  //           })
  //         })
  //         .then((result) => {
  //           if (result.data !== undefined) {
  //             resolve({
  //               data: createRows(result.data.data),
  //               page: result.data.page - 1,
  //               totalCount: result.data.totalPages,
  //             })
  //           } else {
  //             ;<Loader />
  //           }
  //           setDataTable(result)
  //           console.log('urlExport', urlExport)
  //           setQueryExport(urlExport)
  //           setTotalPages(result.data.totalPages)
  //           setFilter(urlCount)
  //         })

  //       dispatch({
  //         type: PHONE_CLEAN_LIST_SUCCESS,
  //         payload: dataTable,
  //       })
  //     }
  //   })

  const dataReports = (query) =>
    new Promise((resolve, reject) => {
      if (userInfo === null || userInfo === undefined) {
        history.push('/')
        return
      } else {
        dispatch({
          type: PHONE_CLEAN_LIST_REQUEST,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        let url = '/phoneslist?'
        let urlExport = 'export-csv?'
        urlExport += '&user=' + userInfo._id
        url += '&pageNumber=' + (query.page + 1)

        if (filterState.phone) {
          url += '&phone=' + filterState.phone
          urlExport += '&phone=' + filterState.phone
        }

        if (filterState.carrier) {
          let encoded = encodeURIComponent(filterState.carrier)
          url += '&carrier=' + encoded
          urlExport += '&carrier=' + encoded
        }

        if (filterState.name) {
          url += '&firstName=' + filterState.name
          urlExport += '&firstName=' + filterState.name
        }

        if (filterState.source) {
          url += '&source=' + filterState.source
          urlExport += '&source=' + filterState.source
        }

        if (filterState.areaCode !== '') {
          url += '&areaCode=' + filterState.areaCode
          urlExport += '&areaCode=' + filterState.areaCode
        }

        if (filterState.clicker !== '') {
          url += '&clicker=' + filterState.clicker
          urlExport += '&clicker=' + filterState.clicker
        }

        if (filterState.converter !== '') {
          url += '&converter=' + filterState.converter
          urlExport += '&converter=' + filterState.converter
        }

        // repliers
        if (filterState.repliers !== '') {
          url += '&repliers=' + filterState.repliers
          urlExport += '&repliers=' + filterState.repliers
        }

        if (filterState.masterCCC) {
          url +=
            '&clicker=true&converter=true&hardBounce=false&suppressed=false&areaCode=true'
          urlExport +=
            '&clicker=true&converter=true&hardBounce=false&suppressed=false&areaCode=true'
        }

        if (filterState.notCCC) {
          url +=
            '&clicker=false&converter=false&hardBounce=false&suppressed=false&areaCode=true'
          urlExport +=
            '&clicker=false&converter=false&hardBounce=false&suppressed=false&areaCode=true'
        }

        if (filterState.startDate !== '') {
          url += '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
          urlExport +=
            '&start=' + moment(filterState.startDate).format('YYYY-MM-DD')
        } else {
          url += '&start='
          urlExport += '&start='
        }

        if (filterState.endDate !== '') {
          url += '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
          urlExport +=
            '&end=' + moment(filterState.endDate).format('YYYY-MM-DD')
        } else {
          url += '&end='
          urlExport += '&end='
        }

        console.log('URL with filters: ', url)
        // console.log('Query: ', query)

        axios
          .get(url, config)
          .catch((error) => {
            console.log(error.response)
            dispatch({
              type: PHONE_CLEAN_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          })
          .then((result) => {
            resolve({
              data: createRows(result.data.data),
              page: result.data.page - 1,
              totalCount: result.data.totalPages,
            })
            setDataTable(result)
            //console.log('urlExport', urlExport)
            setQueryExport(urlExport)
            setTotalPages(result.data.totalPages)
          })

        dispatch({
          type: PHONE_CLEAN_LIST_SUCCESS,
          payload: dataTable,
        })
      }
    })

  //verify onclick Export Button
  useEffect(() => {
    if (exportCSV) {
      console.log('totalProcessPages', totalProcessPages)
      if (totalProcessPages > 50000) {
        Swal.fire({
          icon: 'info',
          title: 'Exceeded limit of rows to export',
          text: 'No more than 500,000',
        }).then((result) => {
          if (result.isConfirmed) {
            setExportCSV(false)
          }
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Download in Progress!',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('call export ')
            dispatch(exportData(queryExport))
          } else {
            console.log('error')
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV])

  const handleChangeMasterCCC = (event) => {
    setFilterState({ ...filterState, masterCCC: event.target.checked })
  }

  const handleChangeNotCCC = (event) => {
    setFilterState({ ...filterState, notCCC: event.target.checked })
  }

  const handleFilterChange = (evt) => {
    const { value, name } = evt.target
    setFilterState({ ...filterState, [name]: value })
  }

  console.log('filterState', filterState)

  useEffect(() => {
    if (
      filterState.areaCode !== '' ||
      filterState.clicker !== '' ||
      filterState.converter !== ''
    ) {
      setCheckGroup({ ...checkGroup, masterCCC: true, notCCC: true })
    } else {
      setCheckGroup({ ...checkGroup, masterCCC: false, notCCC: false })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState])

  useEffect(() => {
    if (filterState.notCCC === true) {
      setCheckGroup({
        ...checkGroup,
        masterCCC: true,
        clicker: true,
        converter: true,
        areaCode: true,
      })
    } else {
      setCheckGroup({
        ...checkGroup,
        masterCCC: false,
        clicker: false,
        converter: false,
        areaCode: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.notCCC])

  useEffect(() => {
    if (filterState.masterCCC === true) {
      setCheckGroup({
        ...checkGroup,
        notCCC: true,
        clicker: true,
        converter: true,
        areaCode: true,
      })
    } else {
      setCheckGroup({
        ...checkGroup,
        notCCC: false,
        clicker: false,
        converter: false,
        areaCode: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.masterCCC])

  console.log('checkGroup', checkGroup)

  const handleDateRangePickerChange = (range) => {
 
    setFilterState({
      ...filterState,
      startDate: range.start,
      endDate: range.end,
    })
  }

  const handleDateRangePickerChangeUpdate = (range) => {
  
    setFilterState({
      ...filterState,
      startUpdateDate: range.start,
      endUpdateDate: range.end,
    })
  }

  const handleClearDateRangePicker = () => {
    setFilterState({
      ...filterState,
      startDate: '',
      endDate: '',
    })
  }

  const handleClearDateRangePickerUpdate = () => {
    setFilterState({
      ...filterState,
      startUpdateDate: '',
      endUpdateDate: '',
    })
  }
  const handleClearFilters = () => {
    setFilterState({
      ...filterState,
      startDate: '',
      endDate: '',
      carrier: '',
      name: '',
      source: '',
      masterCCC: '',
      notCCC: '',
      phone: '',
      areaCode: '',
      clicker: '',
      converter: '',
      repliers: '',
    })

    setCheckGroup({
      notCCC: false,
      masterCCC: false,
    })

    tableRef.current.onQueryChange()
  }

  const filters = (
    <Grid
      container
      spacing={4}
      className={classes.filtersSection}
      justifyContent="space-around"
    >
      <Grid
        item
        xs={12}
        md={4}
        container
        rowSpacing={1}
        style={{ border: '1px #accce3 solid', borderRadius: '10px' }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Carrier"
              type="text"
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
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Phone"
              type="number"
              name="phone"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.phone || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <TextField
              margin="normal"
              label="Search by Source"
              type="text"
              name="source"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.source || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              margin="normal"
              label="Search by Name"
              type="text"
              name="name"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              value={filterState.name || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        container
        rowSpacing={1}
        style={{
          border: '1px #accce3 solid',
          borderRadius: '10px',
          float: 'left',
        }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <FormControl
              variant="standard"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="repliers-label" className={classes.labelSelect}>
                Repliers
              </InputLabel>
              <Select
                labelId="repliers-label"
                name="repliers"
                onChange={handleFilterChange}
                label="Repliers"
                value={filterState.repliers}
              >
                <MenuItem value={''}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <FormControl
              variant="standard"
              fullWidth
              className={classes.formControl}
              disabled={checkGroup.clicker}
            >
              <InputLabel id="clicker-label" className={classes.labelSelect}>
                Clicker
              </InputLabel>
              <Select
                labelId="clicker-label"
                name="clicker"
                onChange={handleFilterChange}
                label="Clicker"
                value={filterState.clicker}
              >
                <MenuItem value={''}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <FormControl
              variant="standard"
              fullWidth
              className={classes.formControl}
              disabled={checkGroup.converter}
            >
              <InputLabel id="converter-label" className={classes.labelSelect}>
                Converter
              </InputLabel>
              <Select
                labelId="converter-label"
                name="converter"
                onChange={handleFilterChange}
                label="Converter"
                value={filterState.converter}
              >
                <MenuItem value={''}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <FormControl
              variant="standard"
              fullWidth
              className={classes.formControl}
              disabled={checkGroup.areaCode}
            >
              <InputLabel id="area-code-label" className={classes.labelSelect}>
                Area Code
              </InputLabel>
              <Select
                labelId="area-code-label"
                name="areaCode"
                onChange={handleFilterChange}
                label="AreaCode"
                value={filterState.areaCode}
              >
                <MenuItem value={''}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        container
        rowSpacing={1}
        style={{
          border: '1px #accce3 solid',
          borderRadius: '10px',
          float: 'left',
        }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Grid className={classes.paperCheck}>
              <FormControl component="fieldset" disabled={checkGroup.masterCCC}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterState.masterCCC}
                      onChange={handleChangeMasterCCC}
                      name="masterCCC"
                      color="primary"
                    />
                  }
                  label="Master CCC"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Grid className={classes.paperCheck}>
              <FormControl component="fieldset" disabled={checkGroup.notCCC}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterState.notCCC}
                      onChange={handleChangeNotCCC}
                      name="notCCC"
                      color="primary"
                    />
                  }
                  label="Not CCC"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.cancelBtn}
              endIcon={<FaSearch />}
              onClick={() => {
                tableRef.current.onQueryChange()
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} md={5}>
            <Tooltip title="Clear Filters" aria-label="clearFilters">
              <Button
                variant="outlined"
                className={commons.secondaryBtn}
                endIcon={<FaSearch />}
                onClick={handleClearFilters}
              >
                Clean Filters
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
  // Alert new export complete
  useEffect(() => {
    if (success) {
      dispatch({ type: PHONE_CLEAN_LIST_RESET })
      setSuccessMsg('File is Complete Export')
      setExportCSV(false)
    }
    if (exportError) setErrorMsg(exportError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportError, success])

  useEffect(() => {
    if (successData) {
      dispatch({ type: PHONE_CLEAN_LIST_RESET })
      setSuccessMsg('Search Complete')
    }
    if (errorData) setErrorMsg(errorData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData, successData])

  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container justifyContent="center">
              <h3>Ingenious Solution Data Base</h3>
            </Grid>
          </Toolbar>
        </Card>
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
                <Grid item xs={12} sm={3} md={2}>
                  <DateRangePicker
                    startValue={filterState.startDate}
                    endValue={filterState.endDate}
                    onChange={handleDateRangePickerChange}
                    onClear={handleClearDateRangePicker}
                    disabled={checkGroup.dateCreate}
                    title={'Create Date'}
                  />
                </Grid>

                {/*<Grid item xs={12} sm={3} md={2}>
                  <DateRangePicker
                    startValue={filterState.startUpdateDate}
                    endValue={filterState.endUpdateDate}
                    onChange={handleDateRangePickerChangeUpdate}
                    onClear={handleClearDateRangePickerUpdate}
                    disabled={checkGroup.dateUpdate}
                    title={'Update Date'}
                  />
  </Grid>*/}
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                    {!loading ? (
                      <Button
                        variant="outlined"
                        className={commons.secondaryBtn}
                        endIcon={<FaFileExport />}
                        onClick={() => setExportCSV(true)}
                      >
                        Export
                      </Button>
                    ) : (
                      <Loader />
                    )}
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Download Last Export" aria-label="export">
                    <Button
                      variant="outlined"
                      className={commons.successBtn}
                      endIcon={<FaFileDownload />}
                      href={'/dashboard/download-csv'}
                      fullWidth
                    >
                      Download
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          {filters}
          <MaterialTable
            style={{ padding: '20px' }}
            title=""
            columns={defaultColumns}
            icons={TableIcons}
            options={{
              exportButton: false,
              exportAllData: false,
              paging: true,
              pageSize: 10,
              selection: false,
              padding: 'default',
              pageSizeOptions: [5, 10],
              filtering: false,
              search: false,
              sorting: true,
            }}
            data={dataReports}
            tableRef={tableRef}
            components={{
              Pagination: PatchedPagination,
            }}

            // actions={[
            //   {
            //     icon: tableIcons.Search,
            //     tooltip: 'my tooltip',
            //     position: 'toolbar',
            //     isFreeAction: true,
            //     onClick: () => {
            //       tableRef.current.onQueryChange()
            //     },
            //   },
            // ]}
          />
        </Card>
      </Grid>
    </div>
  )
}

export default DataTablePhones
