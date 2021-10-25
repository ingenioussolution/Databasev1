import React, { useState } from 'react'
import clsx from 'clsx'
import {
  AppBar,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  useTheme,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import useStyles from './styles.js'
import { Link } from 'react-router-dom'




const DashBoardNavigation = ({
  onDrawerToogle,
  drawerContent,
  dashboardUrl,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const [drawerOpen, setDrawerOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toogleDrawer = () => {
    setDrawerOpen(!drawerOpen)
    onDrawerToogle(drawerOpen)
  }

  const toogleMobileDrawer = () => {
    setMobileOpen(!mobileOpen)
    onDrawerToogle(drawerOpen)
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid
              item
              container
              xs={6}
              className={classes.logoMobileSection}
              
              alignItems="center"
            >
              <IconButton
                color="inherit"
                aria-label="drawerOpen drawer"
                onClick={toogleMobileDrawer}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Grid container item xs={8} alignItems="center">
                <Link to={dashboardUrl} className={classes.mobileLogoLink}>
                  <h5>IGS-GROUP</h5>
                </Link>
              </Grid>
            </Grid>
            <Hidden lgDown implementation="css" className={classes.logoSection}>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <h5>IGS-GROUP</h5>
                <IconButton
                  color="inherit"
                  aria-label="drawerOpen drawer"
                  onClick={toogleDrawer}
                  className={clsx(classes.menuButton, classes.btnBright)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid
              container
              item
              xs={6}
              className={classes.userMenu}
              spacing={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Hidden xsDown>
                <h6>{`Hi, Lisandra`}</h6>
              </Hidden>

              <Grid item>
                <Tooltip title="Logout" aria-label="logout">
                  <IconButton
                    aria-label="logout"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    
      
      <Hidden lgUp implementation="css">
        <SwipeableDrawer
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={toogleMobileDrawer}
          onOpen={toogleMobileDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar className={classes.mobileToolbar}>
            <Link to={dashboardUrl} className={classes.mobileLogoLink}>
              <h6>IGS-GROUP</h6>
            </Link>
          </Toolbar>
          {drawerContent}
        </SwipeableDrawer>
      </Hidden>
      <Hidden
        mdDown
        implementation="css"
        className={clsx({
          [classes.drawerClose]: !drawerOpen,
        })}
      >
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>{drawerContent}</div>
        </Drawer>
      </Hidden>
    </>
  )
}

export default DashBoardNavigation
