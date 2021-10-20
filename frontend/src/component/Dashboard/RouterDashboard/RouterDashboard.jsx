import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CleanList from '../pages/CleanList/CleanList'
import DashboardHome from '../pages/DashboardHome/DashboardHome' 
//import PrivateRoute from '../PrivateRouter/PrivateRouter'

const RouterDashboard = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
    <Route exact path={`${path}/list-data`} component={CleanList}/>
    <Route exact path={`${path}`} component={CleanList} />
   
    <Route exact path={`${path}/login`} component={""}></Route>
    </Switch>
  )
}

export default RouterDashboard
