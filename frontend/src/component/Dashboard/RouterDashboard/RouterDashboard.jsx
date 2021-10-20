import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CleanList from '../pages/CleanList/CleanList'
import DashboardHome from '../pages/DashboardHome/DashboardHome' 
//import PrivateRouter from '../PrivateRouter/PrivateRouter'

const RouterDashboard = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`} component={CleanList}/>
      <Route exact path={`${path}/list-data`} component={DashboardHome}/>
    </Switch>
  )
}

export default RouterDashboard
