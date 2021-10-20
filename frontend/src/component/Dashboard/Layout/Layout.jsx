import React from 'react'
import Navigation from '../Navigation/Navigation'
import DashboardLayout from '../../DashboardLayout/DashboardLayout'
import DashBoardRouter from '../RouterDashboard/RouterDashboard'

const Layout = () => {
 
  return (
    <DashboardLayout
      dashboardMenuContent={<Navigation />}
      dashboardUrl='/dashboard'
      dashboardRouter={DashBoardRouter}
     
    />
  )
}

export default Layout
