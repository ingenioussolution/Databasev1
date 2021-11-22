import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import clsx from 'clsx'
import { FaListUl, FaPhoneSlash, } from 'react-icons/fa'

//import useStyles from './styles'

const AdminNavigation = () => {
  //const classes = useStyles()
  const location = useLocation()
  const { pathname } = location

  return (
    <React.Fragment>
      <List>
        <Link to={'/admin/admin-dashboard'} style={{ textDecoration: 'none' }}>
          <ListItem
            button
            key="dashboard"
            className={clsx({
              active: pathname === '/admin/admin-dashboard' || pathname === '/admin/admin-dashboard',
            })}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Admin Dashboard</ListItemText>
          </ListItem>
        </Link>

        <Link to={'/admin/list-users'}>
          <ListItem
            button
            key="dashboard-data-table-phones"
            className={clsx({
              active: pathname === '/admin/list-users',
            })}
          >
            <ListItemIcon>
              <FaListUl />
            </ListItemIcon>
            <ListItemText>List Users</ListItemText>
          </ListItem>
        </Link>
      
      </List>
    </React.Fragment>
  )
}

export default AdminNavigation
