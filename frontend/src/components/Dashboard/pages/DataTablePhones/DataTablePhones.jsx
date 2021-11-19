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

import { Button, Grid, Tooltip, Toolbar, Card } from '@material-ui/core'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'
import dataStyle from '../../../DataTable/styles'
import clsx from 'clsx'
import { FaFileDownload, FaFileExport } from 'react-icons/fa'

import { forwardRef } from 'react'
import Loader from '../../../Loader/Loader'
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
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const commons = layoutStyles()
  const classesTable = dataStyle()

  const [dataTable, setDataTable] = useState([])
  const [exportCSV, setExportCSV] = useState(false)
  const [queryExport, setQueryExport] = useState('')

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const listExportData = useSelector((state) => state.listExportData)
  const { loading, success, exporting } = listExportData

  const [arrayExport, setArrayExport] = useState(false)

  //------------ UseEffect---------
  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      history.push('/')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, userInfo])

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

        //searching
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
            console.log('urlExport', urlExport)
            setQueryExport(urlExport)
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
      ExportData(queryExport)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV])

  // function export data
  const ExportData = (queryExport) => {
    console.log('Export in progress....')
    console.log('URL query', queryExport)

    dispatch(exportData(queryExport))
  }

  // Update state exportCSV false
  useEffect(() => {
    if (exportCSV && success) {
      setExportCSV(false)
    }

    if (!exportCSV) {
      setArrayExport(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCSV, success])

  console.log("exporting", exporting);

  return (
    <div>
      <Grid container item xs={12}>
        <Card className={classesTable.mainWrapper}>
          <Toolbar className={clsx(classes.tableHeader)}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                spacing={1}
                container
                justifyContent="flex-end"
                className={classes.actionsContainer}
              >
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                    <Button
                      variant="outlined"
                      className={commons.secondaryBtn}
                      endIcon={<FaFileExport />}
                      onClick={() => setExportCSV(true)}
                      disabled={arrayExport ? false : true}
                    >
                      Export
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                  {!loading ?
                  
                    <CSVLink data={exporting} separator={','}>
                      <Button
                        variant="outlined"
                        className={commons.successBtn}
                        endIcon={<FaFileDownload />}
                        //disabled={arrayExport ? true : false}
                      >
                        Download Csv
                      </Button>
                    </CSVLink>
                :
                    <Loader/>
                  }
                  </Tooltip>
                </Grid>
               
                {/*
                <Grid item xs={12} sm={3} md={2}>
                  <Tooltip title="Export" aria-label="export">
                  {!loading ?
                  
                    <CSVLink data={exporting} separator={','}>
                      <Button
                        variant="outlined"
                        className={commons.successBtn}
                        endIcon={<FaFileDownload />}
                        disabled={arrayExport ? true : false}
                      >
                        Download Csv
                      </Button>
                    </CSVLink>
                :
                    <Loader/>
                  }
                  </Tooltip>
                </Grid>
                */}
                
              </Grid>
            </Grid>
          </Toolbar>
          <MaterialTable
            style={{ padding: '20px' }}
            title="Ingenious Solution"
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
          />
        </Card>
      </Grid>
    </div>
  )
}

export default DataTablePhones
