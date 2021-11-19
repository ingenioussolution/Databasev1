import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

import { Button, Grid, Tooltip, Toolbar } from '@material-ui/core'

import { FaFileDownload, FaSyncAlt } from 'react-icons/fa'

import CsvDownloader from 'react-csv-downloader'

import layoutStyles from '../../../../DashboardLayout/styles'
import useStyles from './styles'

const DataTableToolbar = ({ rows, handleRefresh, columns, title }) => {
  const classes = useStyles()
  const commons = layoutStyles()

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  console.log('rows', rows)

  const prepareData = async () => {
    let data = []
    let rowsSelected = []
    rowsSelected = rows
    console.log('rowsSelected', rowsSelected)

    console.log('columns', columns[2])
    rows?.map((row) => {
      let el = {}

      if (typeof row[columns[2].field] === 'string') {
        el[columns[2].field] = row[columns[2].field]
      }
      data.push(el)
      return true
    })
    return data
  }

  const data = prepareData()
  console.log("data", data);

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
            <CsvDownloader
              datas={data}
              filename={title}
              extension=".csv"
              separator=";"
              className={classes.downloader}
            >
              <Button
                variant="outlined"
                className={commons.secondaryBtn}
                endIcon={<FaFileDownload />}
              >
                Export
              </Button>
            </CsvDownloader>
          </Grid>
          {handleRefresh && (
            <Grid item xs={12} sm={3} md={2}>
              <Tooltip title="Refresh" aria-label="export">
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
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default DataTableToolbar
