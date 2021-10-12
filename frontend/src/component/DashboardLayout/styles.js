import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  }, 
  mainSection: {
    flexGrow: 1,
  },
  contentWrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),      
    },
    '&.expanded': {
      paddingLeft: theme.spacing(1),
    },
  },
  content: {
    padding: theme.spacing(3),
    borderRadius: '13px',
    background: theme.palette.dashboard.mainLight,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8),
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
    }
  },
  primaryBtn: {
    color: `${theme.palette.dashboard.primary} !important`,
    border: `1px solid ${theme.palette.dashboard.primary} !important`,
    '& svg': {
      fontSize: '1.1em !important',
    }
  },
  secondaryBtn: {
    color: `${theme.palette.dashboard.secondary} !important`,
    border: `1px solid ${theme.palette.dashboard.secondary} !important`,
    '& svg': {
      fontSize: '1.1em !important',
    }
  },
  successBtn: {
    color: `${theme.palette.dashboard.success} !important`,
    border: `1px solid ${theme.palette.dashboard.success} !important`,
    '& svg': {
      fontSize: '1.1em !important',
    }
  },
}))
