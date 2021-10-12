import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CleanList from '../pages/CleanList/CleanList'

const RouterDashboard = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}`} component={CleanList}/>
    </Switch>
  )
}

export default RouterDashboard
