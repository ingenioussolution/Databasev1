import { makeStyles } from '@material-ui/core/styles'

export const drawerWidth = '18vw'
const mobileDrawerWidth = '80vw'

export default makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.dashboard.light,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logoSection: {
    width: drawerWidth,
    marginLeft: '-1.5vw',
    paddingLeft: '1.5vw',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  mobileLogoLink: {
    display: 'flex',
    paddingTop: '2px',
  },
  mobileLogo: {
    maxWidth: '15vw',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '30vw',
    },
  },
  logoMobileSection: {
    display: 'flex',
    '& h5': {
      margin: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  logo: {
    maxWidth: `calc(${drawerWidth} - 8vw)`,
  },
  menuButton: {
    borderRadius: '14px',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1.2),
      background: theme.palette.dashboard.bgLight,
    },
  },
  userMenu: {},
  btnBright: {
    '&:hover': {
      color: theme.palette.dashboard.light,
      background: theme.palette.dashboard.main,
    },
  },
  link: {
    color: theme.palette.dashboard.main,
    '&:hover': {
      borderRadius: '12px',
    },
  },
  mobileToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    border: 'none',
    '& .MuiDrawer-paperAnchorDockedLeft': {
      border: 'none',
    },
  },
  drawerPaper: {
    width: mobileDrawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '0px',
  },
  drawerContainer: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6),
    },
    '& .MuiListItemIcon-root': {
      justifyContent: 'center',
    },
    '& .MuiListItem-root': {
      marginTop: `${theme.spacing(1)} !important`,
      marginBottom: `${theme.spacing(1)} !important`,
    },
    '& .MuiListItem-button.active': {
      borderRadius: '12px',
      fontWeight: '800',
      color: theme.palette.dashboard.main,
      background: theme.palette.dashboard.bgLight,
      '& .MuiSvgIcon-root': {
        color: theme.palette.dashboard.main,
      },
    },
    '& .MuiListItem-button:hover': {
      borderRadius: '12px',
      color: theme.palette.dashboard.main,
      background: theme.palette.dashboard.bgLight,
      '& .MuiSvgIcon-root': {
        color: theme.palette.dashboard.main,
      },
    },
  },
}))
