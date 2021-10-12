import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  tableHead: {
    color: theme.palette.dashboard.dark,
    fontWeight: 'bold',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  noPadding: {
    padding: '0px'
  }
}))
