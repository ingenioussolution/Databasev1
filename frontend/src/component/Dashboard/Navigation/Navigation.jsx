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

const Navigation = () => {
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
              active: pathname === '/clean-list' || pathname === '/clean-list',
            })}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Link>
      </List>
    </React.Fragment>
  )
}

export default Navigation
