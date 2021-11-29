import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  PHONE_CLEAN_LIST_REQUEST,
  PHONE_CLEAN_LIST_SUCCESS,
  PHONE_CLEAN_LIST_FAIL,
} from '../../../../constants/phonesListClean'

import { CSVLink } from 'react-csv'
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
} from '@material-ui/core'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'
import dataStyle from '../../../DataTable/styles'
import clsx from 'clsx'
import { FaFileDownload, FaFileExport, FaSearch } from 'react-icons/fa'

import { forwardRef } from 'react'
import Loader from '../../../Loader/Loader'
import DateRangePicker from '../../../dateRangePicker/DateRangePicker'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

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
  const [areaCode, setAreaCode] = useState(false)

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const listExportData = useSelector((state) => state.listExportData)
  const { loading, success, exporting } = listExportData

  const [arrayExport, setArrayExport] = useState(false)
  const [download, setDownload] = useState(true)
  const [totalProcessPages, setTotalPages] = useState()

  const [filterState, setFilterState] = useState({
    startDate: '',
    endDate: '',
  })

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

  const dataPagination = (query) =>
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
        url += '&pageNumber=' + (query.page + 1)

        //searching area Code
        if (query.search) {
          url += '&q=' + query.search
          urlExport += '&q=' + query.search
        }

        //filtering
        if (query.filters.length) {
          const filter = query.filters.map((filter) => {
            return `&${filter.column.field}${filter.operator}${filter.value}`
          })
          url += filter.join('')
          urlExport += filter.join('')
        }

        //sorting
        if (query.orderBy) {
          url += '&sort='(query.orderBy.field) + '&order='(query.orderDirection)
        }

        if (areaCode) {
          url += '&areaCode=' + true
          urlExport += '&areaCode=' + true
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

        // console.log('URL with filters: ', url)
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

  // verify onclick Export Button
  useEffect(() => {
    if (exportCSV) {
      setArrayExport(true)
      if (totalProcessPages > 49900) {
        Swal.fire({
          icon: 'info',
          title: 'Exceeded limit of rows to export',
          text: 'No more than 500,000',
        }).then((result) => {
          if (result.isConfirmed) {
            setExportCSV(false)
            setArrayExport(false)
          }
        })
      } else {
        ExportData(queryExport)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV])

  // function export data
  const ExportData = (queryExport) => {
    // console.log('Export in progress....')
    // console.log('URL query', queryExport)

    dispatch(exportData(queryExport))
  }

  // Update state exportCSV false
  useEffect(() => {
    if (exportCSV && success) {
      setExportCSV(false)

      if (exporting) {
        Swal.fire({
          icon: 'info',
          title: 'Download Ready!',
        }).then((result) => {
          if (result.isConfirmed) {
            setDownload(false)
          }
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV, success])

  useEffect(() => {
    if (!download) {
      setArrayExport(false)
    }
  }, [download])

  const handleChangeAreaCode = (event) => {
    setAreaCode(event.target.checked)
  }

  const handleDateRangePickerChange = (range) => {
    setFilterState({
      ...filterState,
      startDate: range.start,
      endDate: range.end,
    })
  }

  const handleClearDateRangePicker = () => {
    setFilterState({
      ...filterState,
      startDate: '',
      endDate: '',
    })
  }

  //console.log('exporting', exporting)
  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container>
              <h3>Ingenious Solution Data Base</h3>
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
                <Grid item xs={12} sm={3} md={2}>
                  <DateRangePicker
                    startValue={filterState.startDate}
                    endValue={filterState.endDate}
                    onChange={handleDateRangePickerChange}
                    onClear={handleClearDateRangePicker}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={2} className={classes.badArea}>
                  <Grid className={classes.paperCheck}>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={areaCode}
                            onChange={handleChangeAreaCode}
                            name="areaCode"
                            color="primary"
                          />
                        }
                        label="Bad Area Code"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaSearch />}
                      onClick={() => {
                        tableRef.current.onQueryChange()
                      }}
                    >
                      Search
                    </Button>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaFileExport />}
                      onClick={() => setExportCSV(true)}
                      disabled={arrayExport}
                    >
                      Export
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Download Last Export" aria-label="export">
                    {!loading ? (
                      <CSVLink
                        data={exporting}
                        separator={','}
                        filename={'my-file.csv'}
                      >
                        <Button
                          variant="outlined"
                          className={commons.successBtn}
                          endIcon={<FaFileDownload />}
                          disabled={download}
                        >
                          Download
                        </Button>
                      </CSVLink>
                    ) : (
                      <Loader />
                    )}
                  </Tooltip>
                </Grid>
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
              filtering: true,
              search: false,
            }}
            data={dataPagination}
            tableRef={tableRef}
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
