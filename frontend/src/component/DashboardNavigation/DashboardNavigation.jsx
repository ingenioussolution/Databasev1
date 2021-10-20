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
  useTheme,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import LogoImg from '../../assests/verificationFavicon.png'
import useStyles from './styles'

const DashboardNavigation = ({
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
      <AppBar position="fixed" className={classes.appBar}>
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
                <img
                className={classes.mobileLogo}
                src={LogoImg}
                alt='logo'
              />
               <h3>ISG-DB</h3>
                </Link>
              </Grid>
            </Grid>
            <Hidden lgDown implementation='css' className={classes.logoSection}>
            <Grid
              item
              container
              alignItems='center'
              justifyContent='space-between'
            >
            <img className={classes.logo} src={LogoImg} alt='logo' />
            <h3>ISG-DB</h3>
              <IconButton
                color='inherit'
                aria-label='drawerOpen drawer'
                onClick={toogleDrawer}
                className={clsx(classes.menuButton, classes.btnBright)}
              >
              
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>

      <Hidden lgUp implementation='css'>
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
            <img
            className={classes.mobileLogo}
            src={LogoImg}
            alt='logo'
          />
            </Link>
          </Toolbar>
          {drawerContent}
        </SwipeableDrawer>
      </Hidden>
      <Hidden
        mdDown
        implementation='css'
        className={clsx({
          [classes.drawerClose]: !drawerOpen,
        })}
      >
        <Drawer
          variant='permanent'
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

export default DashboardNavigation
