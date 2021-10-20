import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'
import grey from '@material-ui/core/colors/grey'

const colorRow = 500

export default makeStyles((theme) => ({
  main: {
    background: theme.palette.dashboard.main,
  },
  mainLight: {
    background: theme.palette.dashboard.mainLight,
  },
  light: {
    background: theme.palette.dashboard.light,
  },
  colorLight: {
    color: theme.palette.dashboard.light,
  },
  colorDark: {
    color: theme.palette.dashboard.dark,
  },
  dark: {
    background: grey[900],
  },
  bgLight: {
    background: theme.palette.dashboard.bgLight,
  },
  grey50: {
    background: theme.palette.dashboard.grey50,
  },
  blue: {
    background: blue[colorRow],
  },
  green: {
    background: green['A700'],
  },
  red: {
    background: red[colorRow],
  },
  orange: {
    background: orange[colorRow],
  },
  card: {
    borderRadius: '8px !important',
    cursor: 'pointer',
    '& svg': {
      transition: 'all ease .4s',
      marginTop: '5px',
    },
    '&:hover': {
      '& svg': {
        transform: `scale(1.2)`,
        opacity: '1',        
      },
    },
  },
  content: {
    padding: `${theme.spacing(2.5)} !important`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} !important`,
    },
    '& svg': {
      opacity: '.7',
      fontSize: '2.2em !important',
    },
  },
  dataValue: {
    margin: '0px !important',
  },
  titleWrapper:{
    marginTop: '12px'
  }
}))
