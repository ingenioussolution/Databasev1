import React from 'react'
import { useLocation, useRouteMatch, Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import clsx from 'clsx'
import { FaListUl } from 'react-icons/fa'

import useStyles from './styles'

const Navigation = () => {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const location = useLocation()
  const { pathname } = location


  return (
    <React.Fragment>
      <List>
        <Link to={`${path}`} style={{ textDecoration: 'none' }}>
          <ListItem
            button
            key="dashboard"
            className={clsx({
              active: pathname === '/dashboard' || pathname === '/dashboard',
            })}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Link>

        <Link to={`${path}/list-data`} >
          <ListItem
            button  key='dashboard-listData'
            className={clsx({
              active:pathname === `${path}/list-data`,
            })}>
            <ListItemIcon>
              <FaListUl />
            </ListItemIcon>
            <ListItemText>List Data</ListItemText>
          </ListItem>
        </Link>
      </List>
    </React.Fragment>
  )
}

export default Navigation
