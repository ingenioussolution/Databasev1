import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  mainWrapper: {
    width: '100%',
    maxWidth: '100%',
  },
  highlight: {
    color: theme.palette.dashboard.text,
    backgroundColor: theme.palette.dashboard.grey50,
  },
  paper: {
    marginBottom: theme.spacing(2),
  },
  actionBtn: {
    padding: theme.spacing(1)
  },  
  actionsCol:{
    maxWidth: '150px',
    '& .MuiGrid-item': {
      [theme.breakpoints.down('lg')]: { 
        margin: theme.spacing(0.7)
      },
      [theme.breakpoints.down('sm')]: { 
        margin: theme.spacing(1.9)
      }
    }
  }, 
  tableLoader: {
    textAlign: 'center',
  },
  noPadding: {
    padding: '0px'
  }
}))
