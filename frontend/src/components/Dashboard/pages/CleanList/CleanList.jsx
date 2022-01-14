import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { listPhoneData } from '../../../../actions/phoneListCleanActions'
import { useSelector, useDispatch } from 'react-redux'
import DataTableHead from '../../../DataTable/dataTableHead/DataTableHead'

import DataTableToolbar from '../../../DataTable/dataTableToolbar/DataTableToolbar'
import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  InputAdornment,
  //InputLabel,
  //MenuItem,
  //Select,
  TextField,
  Button,
  //FormControl,
} from '@material-ui/core'

import { FaSearch } from 'react-icons/fa'
import Loader from '../../../Loader/Loader'
import dataStyle from '../../../DataTable/styles'
import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'

const CleanList = () => {
  const classesTable = dataStyle()
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const commons = layoutStyles()
  const query = location.search ? new URLSearchParams(location.search) : false

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const listPhone = useSelector((state) => state.listPhoneClean)
  const { loading, listPhones, page, pages } = listPhone

  //const [rowsPerPage, setRowsPerPage] = useState(10 || 5)

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(listPhones ? listPhones : '')
  const [pageState, setPageState] = useState(0)
  const [selected, setSelected] = useState([])

  console.log('page state: ', page)

  const clearFilters = {}

  const [filterState, setFilterState] = useState(clearFilters)

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      history.push('/')
      return
    }
  }, [history, userInfo])

  useLayoutEffect(() => {
    dispatch(listPhoneData(pageState))
  }, [dispatch, pageState])

  // useEffect(() => {
  //   if (pageState === 0) {
  //     setPageState(0)
  //     dispatch(listPhoneData(pageState))
  //   } else {
  //     dispatch(listPhoneData(pageState))
  //   }

  // }, [dispatch, pageState])

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage)
    setPageState(newPage)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listPhones.map((row) => row['phone'])
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleRefresh = () => {
    dispatch(listPhoneData(pageState))
    setFilterState(clearFilters)
    history.push('/dashboard/list-phones')
  }

  const handleFilterChange = (evt) => {
    const { value, name } = evt.target
    setFilterState({ ...filterState, [name]: value })
  }

  const filterListPhones = (listPhones) => {
    return listPhones?.filter((phones) => {
      if (filterState.phone && !phones.phone.includes(filterState.phone))
        return false
      if (filterState.revenue && !phones.revenue.includes(filterState.revenue))
        return false
      return true
    })
  }

  // useEffect(() => {
  //   if (query) {
  //     for (const filter of query.keys()) {
  //       setFilterState({ ...filterState, [filter]: query.get(filter) })
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading])

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
        md={5}
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
              //value={filterState.carrier || ''}
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
              type="phone"
              name="phone"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              //value={filterState.phone || ''}
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
              //value={filterState.source || ''}
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
              type="name"
              name="name"
              fullWidth
              className="dashboard-input"
              variant="outlined"
              onChange={handleFilterChange}
              //value={filterState.name || ''}
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
        md={5}
        container
        rowSpacing={1}
        style={{ border: '1px #accce3 solid', borderRadius: '10px' }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.secondaryBtn}
              endIcon={<FaSearch />}
            >
              Master CCC
            </Button>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.secondaryBtn}
              endIcon={<FaSearch />}
            >
              Not CCC
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.secondaryBtn}
              endIcon={<FaSearch />}
            >
              Master CCC
            </Button>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginBottom: '10px' }}>
            <Button
              fullWidth
              variant="outlined"
              className={commons.cancelBtn}
              endIcon={<FaSearch />}
            >
              Search Data
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Grid container item xs={12}>
      <Card className={classesTable.mainWrapper}>
        <DataTableToolbar
          title={'List Phones'}
          numSelected={selected.length}
          handleRefresh={handleRefresh}
          selected={selected}
          rows={createRows(filterListPhones(listPhones))}
          columns={defaultColumns}
          identifier={'phone'}
        />

        {filters}
        <TableContainer>
          <Table
            className={classesTable.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <DataTableHead
              classes={classesTable}
              order={order}
              orderBy={orderBy}
              rowCount={listPhones?.length || 0}
              onSelectAllClick={handleSelectAllClick}
              columns={defaultColumns}
              onRequestSort={handleRequestSort}
            />
            {!loading ? (
              <TableBody>
                {createRows(filterListPhones(listPhones))?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row['phone']}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={''} />
                      </TableCell>
                      {defaultColumns?.map((column) => (
                        <TableCell
                          key={column.field}
                          align={
                            row.getAlignAt
                              ? row.getAlignAt(column.align)
                              : column.align
                          }
                        >
                          {row.getValueAt
                            ? row.getValueAt(column.field)
                            : row[column.field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className={classesTable.tableLoader}>
                    <Loader />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={pages || 0}
          rowsPerPage={10}
          page={pageState}
          onPageChange={handleChangePage}
        />
      </Card>
    </Grid>
  )
}

export default CleanList
