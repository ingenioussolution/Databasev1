import React from 'react'
import clsx from 'clsx'

import { Button, Grid, Tooltip, Toolbar } from '@material-ui/core'

import { FaSyncAlt } from 'react-icons/fa'

import layoutStyles from '../../../../DashboardLayout/styles'
import useStyles from './styles'

const DataTableToolbar = ({handleRefresh}) => {
  const classes = useStyles()
  const commons = layoutStyles()


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
