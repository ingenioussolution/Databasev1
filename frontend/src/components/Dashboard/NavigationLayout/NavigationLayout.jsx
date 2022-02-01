import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import {
  FaListUl,
  FaPhoneSlash,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
} from 'react-icons/fa'

import useStyles from './styles'

const NavigationLayout = () => {
  const classes = useStyles()
  const location = useLocation()
  const { pathname } = location

  const [menus, setMenuToogle] = useState({
    dataTable: false,
    blackList: false,
  })
  const handleMenuToogle = (menuName) => {
    setMenuToogle({ ...menus, [menuName]: !menus[menuName] })
  }

  return (
    <React.Fragment>
      <List>
        <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
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

        <ListItem
          button
          key="dashboard-settings"
          className={clsx({
            active: pathname.includes('dataTable'),
          })}
          onClick={() => handleMenuToogle('dataTable')}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Data Table</ListItemText>
          {menus.dataTable ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={menus.dataTable}
          className={classes.collapse}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <Link to={'/dashboard/data-table-phones'}>
              <ListItem
                button
                className={clsx({
                  active: pathname === '/dashboard/data-table-phones',
                })}
              >
                <ListItemIcon className={classes.dotIcon}>
                  <FaListUl className={classes.sizeIcon} />
                </ListItemIcon>
                <ListItemText>Phone List</ListItemText>
              </ListItem>
            </Link>

            <Link to={'/dashboard/bad-area-code'}>
              <ListItem
                button
                key="bad-area"
                className={clsx({
                  active: pathname === '/dashboard/bad-area-code',
                })}
              >
                <ListItemIcon className={classes.dotIcon}>
                  <FaPhoneSlash className={classes.sizeIcon} />
                </ListItemIcon>
                <ListItemText>Bad States</ListItemText>
              </ListItem>
            </Link>
            <Link to={'/dashboard/upload-new-data'}>
              <ListItem
                button
                key="upload-csv"
                className={clsx({
                  active: pathname === '/dashboard/upload-new-data',
                })}
              >
                <ListItemIcon className={classes.dotIcon}>
                  <FaCloudUploadAlt className={classes.sizeIcon} />
                </ListItemIcon>
                <ListItemText>Upload New Data</ListItemText>
              </ListItem>
            </Link>
            <Link to={'/dashboard/download-csv'}>
              <ListItem
                button
                key="dashboard-csv"
                className={clsx({
                  active: pathname === '/dashboard/download-csv',
                })}
              >
                <ListItemIcon className={classes.dotIcon}>
                  <FaCloudDownloadAlt className={classes.sizeIcon} />
                </ListItemIcon>
                <ListItemText>Download Csv File</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <ListItem
          button
          key="api-black-list"
          className={clsx({
            active: pathname.includes('blackList'),
          })}
          onClick={() => handleMenuToogle('blackList')}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Look Up</ListItemText>
          {menus.blackList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={menus.blackList}
          className={classes.collapse}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <Link to={'/dashboard/upload-api-data'}>
              <ListItem
                button
                className={clsx({
                  active: pathname === '/dashboard/upload-api-data',
                })}
              >
                <ListItemIcon className={classes.dotIcon}>
                  <FaCloudUploadAlt className={classes.sizeIcon} />
                </ListItemIcon>
                <ListItemText>Upload BL Data</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Collapse>

        {/* <Link to={'/dashboard/data-table-phones'}>
          <ListItem
            button
            key="dashboard-data-table-phones"
            className={clsx({
              active: pathname === '/dashboard/data-table-phones',
            })}
          >
            <ListItemIcon>
              <FaListUl />
            </ListItemIcon>
            <ListItemText>Data Table</ListItemText>
          </ListItem>
          </Link>*/}
      </List>
    </React.Fragment>
  )
}

export default NavigationLayout
