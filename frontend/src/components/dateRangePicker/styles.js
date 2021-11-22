import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  picker: {
    zIndex: 9999,
  },
  backdrop: {
    zIndex: 9000,
  },
  paper: {
    border: `1px solid rgba(144, 202, 249, 0.46) !important`,
    [theme.breakpoints.up('lg')]: {
      maxWidth: '48vw',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '83vw',
    },
  },
  actionsWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(8)}`,
    },
  },
}))
