import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import {
  Button,
  Grid,
  Tooltip,
  Toolbar,
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core'

import {
  FaFileDownload,
  FaPlusCircle,
  FaChevronDown,
  FaSyncAlt,
} from 'react-icons/fa'

import CsvDownloader from 'react-csv-downloader'

import layoutStyles from '../../DashboardLayout/styles'
import useStyles from './styles'

const DataTableToolbar = ({
  numSelected,
  selected,
  title,
  rows,
  columns,
  identifier,
  addHandler,
  deleteSelected,
  handleRefresh,
  bulkActions,
}) => {
  const classes = useStyles()
  const commons = layoutStyles()

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prepareData = async () => {
    let rowsSelected = []
    if (selected.length > 0) {
      rowsSelected = rows.filter((row) => selected.includes(row[identifier]))
    } else {
      rowsSelected = rows
    }

    let data = []
    rowsSelected.map((row) => {
      let el = {}
      columns?.map((column) => {
        if (typeof row.getValueAt(column.field) === 'string') {
          el[column.field] = row.getValueAt(column.field)
        } else if (typeof row[column.field] === 'string') {
          el[column.field] = row[column.field]
        }
        return true
      })
      data.push(el)
      return true
    })

    return data
  }

  const data = prepareData()

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Toolbar className={clsx(classes.tableHeader)}>
      <Grid container>
        <Grid item xs={12} sm={3}>
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              {title}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          spacing={1}
          container
          justifyContent='flex-end'
          className={classes.actionsContainer}
        >
          <Grid item xs={12} sm={3} md={2}>
            <CsvDownloader
              datas={data}
              filename={title}
              extension='.csv'
              separator=';'
              className={classes.downloader}
            >
              <Button
                variant='outlined'
                className={commons.secondaryBtn}
                endIcon={<FaFileDownload />}
              >
                Export
              </Button>
            </CsvDownloader>
          </Grid>
          {handleRefresh && (
            <Grid item xs={12} sm={3} md={2}>
              <Tooltip title='Refresh' aria-label='export'>
                <Button
                  className={commons.secondaryBtn}
                  endIcon={<FaSyncAlt />}
                  onClick={() => handleRefresh()}
                >
                  Refresh
                </Button>
              </Tooltip>
            </Grid>
          )}
          {addHandler && (
            <Grid item xs={12} sm={3} md={2}>
              <Tooltip title='Add' aria-label='export'>
                <Link to={addHandler}>
                  <Button
                    className={clsx(commons.successBtn, classes.addBtn)}
                    endIcon={<FaPlusCircle />}
                  >
                    Add
                  </Button>
                </Link>
              </Tooltip>
            </Grid>
          )}
          {numSelected > 0 && (
            <Grid item xs={12} sm={4} md={3}>
              <Button
                ref={anchorRef}
                variant='outlined'
                color='secondary'
                onClick={handleToggle}
                className={commons.primaryBtn}
                endIcon={<FaChevronDown />}
              >
                Bulk actions
              </Button>
            </Grid>
          )}
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className={classes.bulkMenuWrapper}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'right top' : 'right bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                      className={classes.bulkMenu}
                    >
                      {bulkActions &&
                        bulkActions.map((action) => (
                          <MenuItem
                            onClick={(evt) => {
                              if (action.handleClick)
                                action.handleClick(selected)
                              handleClose(evt)
                            }}
                          >
                            {action.label}
                          </MenuItem>
                        ))}
                      {deleteSelected && (
                        <MenuItem
                          onClick={(evt) => {
                            if (typeof deleteSelected === 'function')
                              deleteSelected()
                            handleClose(evt)
                          }}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

export default DataTableToolbar
