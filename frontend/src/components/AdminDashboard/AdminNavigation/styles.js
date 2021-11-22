import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  collapse: {
    borderLeft: `1px solid ${theme.palette.dashboard.mainLight}`,
    marginLeft: theme.spacing(4),
  },
  nested: {
    '&:hover': {
      background: 'none !important',
    },
    '&.active': {
      background: 'none !important',
    },
  },
  dotIcon: {
    minWidth: '25px',
    justifyContent: 'flex-start',
    '& svg': {
      fontSize: '.65em',
    },
  },
}))
