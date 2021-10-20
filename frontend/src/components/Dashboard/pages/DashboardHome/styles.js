import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  chartContainer: {
    minHeight: '300px',
  },
  tableHead: {
    fontWeight: 'bold',
  },
  tablesSection: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
  },
  cellSmallPaddingX: {
    paddingLeft: `${theme.spacing(1.7)} !important`,
    paddingRight: `${theme.spacing(1.7)} !important`,
    paddingTop: `${theme.spacing(1.5)} !important`,
    paddingBottom: `${theme.spacing(1.5)} !important`,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: `${theme.spacing(4)} !important`,
      paddingRight: `${theme.spacing(4)} !important`,
    },
  },
  tableAction: {
    textAlign: 'center',
    justifyContent: 'center',
  },
}))
