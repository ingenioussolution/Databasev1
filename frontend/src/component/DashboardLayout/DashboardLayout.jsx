import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Grid, Toolbar } from '@material-ui/core'
import DashBoardNavigation from '../DashboardNavigation/DashboardNavigation'
import useStyles from './styles'

const DashboardLayout = ({ dashboardMenuContent, dashboardUrl,dashboardRouter }) => {
  const classes = useStyles()
  const today = new Date()

  const [drawerClosed, setDraweClosed] = useState(false)

  return (
    <div className={clsx('dashboard', classes.root)}>
      <CssBaseline />
      <DashBoardNavigation
        onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
        drawerContent={dashboardMenuContent}
        dashboardUrl={dashboardUrl}
      />
      <div className={classes.sectionWrapper}>
        <Toolbar />
        <main
          className={clsx(classes.mainSection, {
            expanded: drawerClosed,
          })}
        ></main>
        {React.createElement(dashboardRouter)}
        <Grid item container className={classes.copyright} xs={11} md={12}>
          Copyright {today.getFullYear()} Ingenious Solution DB. All rights
          reserved. | &nbsp;Designed by: Ingenious Solution Group
        </Grid>
      </div>
    </div>
  )
}

// DashboardLayout.propTypes = {
//   dashboardMenuContent: PropTypes.node.isRequired,
//   dashboardUrl: PropTypes.string.isRequired,
//   dashboardRouter: PropTypes.any.isRequired,
// }

export default DashboardLayout

// {React.createElement(dashboardRouter)}
