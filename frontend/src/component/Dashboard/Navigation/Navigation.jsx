import React, { useState } from 'react'
import { useLocation, useRouteMatch, Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  //Collapse,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
//import useStyles from './styles'

const Navigation = () => {
  //const classes = useStyles()
  const { path } = useRouteMatch()
  const location = useLocation()
  const { pathname } = location

  // const [menus, setMenuToogle] = useState({
  //   listData: false,
  // })

  // const handleMenuToogle = (menuName) => {
  //   setMenuToogle({ ...menus, [menuName]: !menus[menuName] })
  // }

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

        
      </List>
    </React.Fragment>
  )
}

export default Navigation
