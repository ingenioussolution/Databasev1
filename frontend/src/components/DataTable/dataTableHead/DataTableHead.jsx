import React from 'react'

import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

import useStyles from './styles'

const DataTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columns,
  actionsColCalc,
}) => {
  const classes = useStyles()

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  console.log('columns', columns)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map((headCell) => {
          const compareBy = headCell.compareBy || headCell.field
          return (
            <TableCell
              key={compareBy}
              align={
                headCell.align
                  ? headCell.align
                  : headCell.numeric
                  ? 'right'
                  : 'left'
              }
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === compareBy ? order : false}
              className={classes.tableHead}
            >
              <TableSortLabel
                active={orderBy === compareBy}
                direction={orderBy === compareBy ? order : 'asc'}
                onClick={createSortHandler(compareBy)}
              >
                {headCell.title}
                {orderBy === compareBy ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
        {actionsColCalc > 0 && (
          <TableCell className={classes.tableHead}>Actions</TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

DataTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
}

export default DataTableHead
