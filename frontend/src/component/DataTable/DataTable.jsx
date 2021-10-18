import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2/src/sweetalert2.js'
import {
  Card,
  Grid,
  useTheme,
  withWidth,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
} from '@material-ui/core'
//import { FaPen, FaTrash, FaEye } from 'react-icons/fa'

import { getComparator, stableSort } from '../../utils/table'
import DataTableHead from './dataTableHead/DataTableHead'
import DataTableToolbar from './dataTableToolbar/DataTableToolbar'

import useStyles from './styles'
import { mdDown } from '../../utils/breakpoints'

const DataTable = ({
  title,
  loading,
  rows,
  columns,
  rowsIdentity,
  addHandler,
  viewHandler,
  handleRefresh,
  editHandler,
  deleteHandler,
  filters,
  extraActions,
  moreAction,
  bulkActions,
  cantRowsPerPage,
  width,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(columns ? columns[0].field : '')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(cantRowsPerPage || 5)


  console.log("loading",loading);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row[rowsIdentity])
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = rows
    ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
    : 0

  const handleEditClick = (identification) => {
    return editHandler(identification)
  }

  const handleViewClick = (identification) => {
    return viewHandler(identification)
  }

  const handleDeleteClick = (identification) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this element!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: theme.palette.dashboard.alertConfirm,
      cancelButtonText: 'No, keep it',
      cancelButtonColor: theme.palette.dashboard.alertCancel,
      customClass: {
        container: 'high-z-index',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (deleteHandler) deleteHandler(identification)
      }
    })
  }

  const handleDeleteSelectedClick = deleteHandler
    ? () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this elements!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          confirmButtonColor: theme.palette.dashboard.alertConfirm,
          cancelButtonText: 'No, keep it',
          cancelButtonColor: theme.palette.dashboard.alertCancel,
          customClass: {
            container: 'high-z-index',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            if (deleteHandler) {
              selected.map((id) => deleteHandler(id))
              setSelected([])
            }
          }
        })
      }
    : false

  const defaultActionsCalc =
    (viewHandler ? 1 : 0) +
    (editHandler ? 1 : 0) +
    (deleteHandler ? 1 : 0) +
    (moreAction ? 1 : 0)
  const actionsColCalc = extraActions
    ? extraActions.length + defaultActionsCalc
    : defaultActionsCalc

  let actionColsW = actionsColCalc > 0 ? 12 / Math.floor(actionsColCalc) : 1
  if (actionColsW < 1) actionColsW = 1
  if (actionColsW > 3) actionColsW = 3

  return (
    <Card className={classes.mainWrapper}>
      <DataTableToolbar
        title={title}
        numSelected={selected.length}
        addHandler={addHandler}
        handleRefresh={handleRefresh}
        deleteSelected={handleDeleteSelectedClick}
        bulkActions={bulkActions}
        selected={selected}
        rows={rows}
        columns={columns}
        identifier={rowsIdentity}
      />
      {filters}
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          aria-label='enhanced table'
        >
          <DataTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length || 0}
            columns={columns}
            actionsColCalc={actionsColCalc}
          />
          {!loading ? (
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[rowsIdentity])
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row[rowsIdentity]}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding='checkbox'
                        onClick={(event) =>
                          handleClick(event, row[rowsIdentity])
                        }
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {columns?.map((column) => (
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
                      {actionsColCalc > 0 && (
                        <TableCell align='center'>
                          <Grid
                            container
                            className={classes.actionsCol}
                            direction={mdDown(width) ? 'column' : 'row'}
                            alignItems='center'
                            justifyContent='flex-start'
                            spacing={
                              width === 'sm' ? 2 : width === 'md' ? 3 : 1
                            }
                          >
                            {viewHandler && (
                              <Grid item xs={actionColsW}>
                                <Tooltip title='View element' aria-label='view'>
                                  <Link to={handleViewClick(row[rowsIdentity])}>
                                    <IconButton
                                      size='small'
                                      className={classes.actionBtn}
                                      aria-label='edit'
                                    >
                                    
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                              </Grid>
                            )}
                            {editHandler && (
                              <Grid item xs={actionColsW}>
                                <Tooltip title='Edit element' aria-label='edit'>
                                  <Link to={handleEditClick(row[rowsIdentity])}>
                                    <IconButton
                                      size='small'
                                      className={classes.actionBtn}
                                      aria-label='edit'
                                    >
                                  
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                              </Grid>
                            )}
                            {deleteHandler && (
                              <Grid item xs={actionColsW}>
                                <Tooltip
                                  title='Remove element'
                                  aria-label='remove'
                                >
                                  <IconButton
                                    size='small'
                                    aria-label='edit'
                                    className={classes.actionBtn}
                                    onClick={() =>
                                      handleDeleteClick(row[rowsIdentity])
                                    }
                                  >
                                   
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            )}
                            {extraActions?.map((action) => (
                              <Grid
                                item
                                xs={actionColsW}
                                key={
                                  action.title || `action-${row[rowsIdentity]}`
                                }
                              >
                                <Tooltip
                                  title={action.title || ''}
                                  aria-label={action.title || ''}
                                >
                                  <IconButton
                                    size='small'
                                    aria-label={action.title}
                                    className={classes.actionBtn}
                                    onClick={(evt) => {
                                      if (action.handleClick)
                                        action.handleClick(row[rowsIdentity])
                                      if (action.handleClickWith)
                                        action.handleClickWith({
                                          evt,
                                          id: row[rowsIdentity],
                                        })
                                    }}
                                  >
                                    {(action.icon &&
                                    typeof action.icon === 'function'
                                      ? action.icon(row[rowsIdentity])
                                      : action.icon) || ''}
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            ))}
                            {moreAction && (
                              <Grid item xs={2}>
                                {moreAction(row[rowsIdentity])}
                              </Grid>
                            )}
                          </Grid>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className={classes.tableLoader}>
                  ...
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default withWidth()(DataTable)
