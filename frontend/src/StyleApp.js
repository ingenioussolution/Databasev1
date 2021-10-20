import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth } from './components/DashboardNavigation/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& ::-webkit-scrollbar': {
      width: '5px',
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.dashboard.text,
      borderRadius: '6px',
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionWrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  mainSection: {
    flexGrow: 1,
    padding: theme.spacing(3),
    borderRadius: '13px',
    minHeight: '100vh',
    maxWidth: `calc(96vw - ${drawerWidth})`,
    minWidth: `calc(96vw - ${drawerWidth})`,
    background: theme.palette.dashboard.mainLight,
    '&.expanded': {
      maxWidth: '96vw',
      minWidth: '96vw',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '93vw !important',
      minWidth: '93vw !important',
    },
  },
  card: {
    borderRadius: '12px',
  },
  copyright: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  },
  primaryBtn: {
    border: `1px solid ${theme.palette.dashboard.primary} !important`,
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.dashboard.text} !important`,
    },
    '&:not(.Mui-disabled)': {
      color: `${theme.palette.dashboard.primary} !important`,
      '& svg': {
        fontSize: '1.1em !important',
      },
    },
  },
  secondaryBtn: {
    border: `1px solid ${theme.palette.dashboard.secondary} !important`,
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.dashboard.text} !important`,
    },
    '&:not(.Mui-disabled)': {
      color: `${theme.palette.dashboard.secondary} !important`,
      '& svg': {
        fontSize: '1.1em !important',
      },
    },
  },
  successBtn: {
    border: `1px solid ${theme.palette.dashboard.success} !important`,
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.dashboard.text} !important`,
    },
    '&:not(.Mui-disabled)': {
      color: `${theme.palette.dashboard.success} !important`,
      '& svg': {
        fontSize: '1.1em !important',
      },
    },
  },
  cancelBtn: {
    border: `1px solid ${theme.palette.dashboard.error} !important`,
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.dashboard.text} !important`,
    },
    '&:not(.Mui-disabled)': {
      color: `${theme.palette.dashboard.error} !important`,
      '& svg': {
        fontSize: '1.1em !important',
      },
    },
  },
}))
