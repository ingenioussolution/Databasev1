import React from 'react'
import clsx from 'clsx'

import { Button, Grid, Tooltip, Toolbar, Typography } from '@material-ui/core'

import { FaPlusSquare } from 'react-icons/fa'

import layoutStyles from '../../../DashboardLayout/styles'
import useStyles from './styles'

const DataTableToolbar = ({ AddUser }) => {
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
          justifyContent="space-between"
          className={classes.actionsContainer}
        >
        <Grid item xs={12} sm={3}>
        <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'
            >
          {"Admin Users"}
          </Typography>
        </Grid>
          {AddUser && (
            <Grid item xs={12} sm={3} md={2}>
              <Tooltip title="Refresh" aria-label="export">
                <Button
                  className={commons.secondaryBtn}
                  endIcon={<FaPlusSquare />}
                  href={AddUser}
                >
                  Add New User
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
