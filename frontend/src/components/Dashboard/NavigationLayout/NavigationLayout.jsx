import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import clsx from 'clsx'
import {
  FaListUl,
  FaPhoneSlash,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
} from 'react-icons/fa'

//import useStyles from './styles'

const NavigationLayout = () => {
  //const classes = useStyles()
  const location = useLocation()
  const { pathname } = location

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
        <Link to={'/dashboard/data-table-phones'}>
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
        </Link>
        {/* Master CCC */}
        {/*<Link to={'/dashboard/data-master-ccc'}>
          <ListItem
            button
            key="dashboard-data-table-phones"
            className={clsx({
              active: pathname === '/dashboard/data-master-ccc',
            })}
          >
            <ListItemIcon>
              <FaListUl />
            </ListItemIcon>
            <ListItemText>Master CCC</ListItemText>
          </ListItem>
          </Link>*/}
        <Link to={'/dashboard/bad-area-code'}>
          <ListItem
            button
            key="bad-area"
            className={clsx({
              active: pathname === '/dashboard/bad-area-code',
            })}
          >
            <ListItemIcon>
              <FaPhoneSlash />
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
            <ListItemIcon>
              <FaCloudUploadAlt />
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
            <ListItemIcon>
              <FaCloudDownloadAlt />
            </ListItemIcon>
            <ListItemText>Download Csv File</ListItemText>
          </ListItem>
        </Link>
       {/* <Link to={'/dashboard/list-phones'}>
          <ListItem
            button
            key="dashboard-data-table-phones"
            className={clsx({
              active: pathname === '/dashboard/list-phones',
            })}
          >
            <ListItemIcon>
              <FaListUl />
            </ListItemIcon>
            <ListItemText>Data Table V1</ListItemText>
          </ListItem>
          </Link>*/}
        
      </List>
    </React.Fragment>
  )
}

export default NavigationLayout
