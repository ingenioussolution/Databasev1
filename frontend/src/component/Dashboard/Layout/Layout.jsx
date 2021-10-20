import React from 'react'
import NavigationLayout from '../NavigationLayout/NavigationLayout'
import DashboardLayout from '../../DashboardLayout/DashboardLayout'
import DashBoardRouter from '../RouterDashboard/RouterDashboard'

const Layout = () => {
 
  return (
    <DashboardLayout
      dashboardMenuContent={<NavigationLayout/>}
      dashboardUrl='/dashboard'
      dashboardRouter={DashBoardRouter}
    />
  )
}

export default Layout
