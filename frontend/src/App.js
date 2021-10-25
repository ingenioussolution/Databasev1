import React, { useState } from 'react'
import StyleApp from './StyleApp'

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Grid, Toolbar } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import NavigatorLayout from './components/DashboardNavigation/DashboardNavigation'
import Navigation from './components/Dashboard/NavigationLayout/NavigationLayout'
import DashboardHome from './components/Dashboard/pages/DashboardHome/DashboardHome'
import CleanList from './components/Dashboard/pages/CleanList/CleanList'
import DataTablePhones from './components/Dashboard/pages/DataTablePhones/DataTablePhones'

const App = () => {
  const classes = StyleApp()
  const [drawerClosed, setDraweClosed] = useState(false)

  const today = new Date()

  return (
    <Router>
    <div className={clsx('dashboard', classes.root)}>
      <CssBaseline />

      <NavigatorLayout
        onDrawerToogle={(isClosed) => setDraweClosed(isClosed)}
        dashboardUrl="/dashboard"
        drawerContent={<Navigation/>}
      />

      <div className={classes.sectionWrapper}>
        <Toolbar />
        <main
          className={clsx(classes.mainSection, {
            expanded: drawerClosed,
          })}
        >
          <Switch>
            <Route path="/dashboard" exact component={DashboardHome} />
            <Route path="/dashboard/list-phones" exact component={CleanList} />
            <Route path="/dashboard/data-table-phones" exact component={DataTablePhones} />
          </Switch>
        </main>
        <Grid item container className={classes.copyright} xs={11} md={12}>
          Copyright {today.getFullYear()} Ingenious Solution Group. All rights reserved.
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
          </a>
        </Grid>
      </div>
    </div>
    </Router>
  )
}

export default withRouter(App)
