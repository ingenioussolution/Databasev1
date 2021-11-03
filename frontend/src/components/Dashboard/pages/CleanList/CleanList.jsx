import React, { useState, useEffect } from 'react'
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
  //FormControl,
} from '@material-ui/core'
import { FaSearch } from 'react-icons/fa'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'

import dataStyle from '../../../DataTable/styles'
import useStyles from './styles'

const CleanList = () => {
  const classesTable = dataStyle()
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const query = location.search ? new URLSearchParams(location.search) : false

  const listPhone = useSelector((state) => state.listPhoneClean)
  const { loading, error, listPhones, page, pages } = listPhone

  const [rowsPerPage, setRowsPerPage] = useState(10 || 5)

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(listPhones ? listPhones : '')
  const [pageState, setPageState] = useState(page || 0)
  const [selected, setSelected] = useState([])

  const clearFilters = {}

  const [filterState, setFilterState] = useState(clearFilters)

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'
    if (pageState === 0) {
      setPageState(pageState)
      dispatch(listPhoneData(pageState))
    } else {
      dispatch(listPhoneData(pageState))
    }
  }, [dispatch, history, pageState])

  const handleChangePage = (event, newPage) => {
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

      // if (filterState.clicker !== '' && phones.clicker !== filterState.clicker)
      //   return false

      return true
    })
  }

  useEffect(() => {
    if (query) {
      for (const filter of query.keys()) {
        setFilterState({ ...filterState, [filter]: query.get(filter) })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const filters = (
    <Grid container spacing={4} className={classes.filtersSection}>
      <Grid item xs={12} md={4}>
        <TextField
          margin="normal"
          label="Search by Phone"
          type="phone"
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
  {/*
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
            <MenuItem value={'true'}>True</MenuItem>
            <MenuItem value={'false'}>False</MenuItem>
          </Select>
        </FormControl>
      </Grid>
  */}
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
                {createRows(filterListPhones(listPhones)).map((row, index) => {
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
                    ...
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
          rowsPerPage={rowsPerPage}
          page={pageState}
          onPageChange={handleChangePage}
        />
      </Card>
    </Grid>
  )
}

export default CleanList
