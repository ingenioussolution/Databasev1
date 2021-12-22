import { makeStyles, withStyles } from '@material-ui/core/styles'
import { LinearProgress, Switch } from '@material-ui/core'

export default makeStyles((theme) => ({
  wrapper: {
    width: '100%',
  },
  profileImgBg: {
    height: '8.2vw',
    borderRadius: '5vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '16vw',
    },
  },
  profileImg: {
    margin: '0px auto',
    display: 'block',
    height: '8vw',
    clipPath: 'circle(4vw at center)',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '20vw',
      clipPath: 'circle(10vw at center)',
    },
  },
  videoImg: {
    margin: '0px auto',
    display: 'block',
    height: '8vw',
    width: '8vw',
    clipPath: 'circle(4vw at center)',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '20vw',
      height: '20vw',
      clipPath: 'circle(10vw at center)',
    },
  },
  porfilePicsContainer: {
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  mainContent: {
    margin: 'auto',
  },
  formContent: {
    margin: 'auto',
  },
  formControl: {
    width: '100%',
    minWidth: 250,
  },
  volumeBtn: {
    float: 'right',
  },
  noPicture: {
    fontSize: '8vw',
    display: 'block',
  },
  card: {
    width: '100%',
  },
  submitWrapper: {
    paddingRight: '0px !important',
  },
  noRightPad: {
    paddingRight: '0px !important',
  },
  imgTextHelper: {
    marginTop: `${theme.spacing(1)} !important`,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: `${theme.spacing(6)} !important`,
    },
    '& a': {
      color: theme.palette.dashboard.main,
    },
  },
  cardTitle: {
    padding: `${theme.spacing(2)} !important`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} !important`,
    },
  },
  cardData: {
    marginTop: theme.spacing(3),
    paddingTop: '0px !important',
    borderBottom: `1px solid ${theme.palette.dashboard.text}`,
  },
  dataValue: {
    textAlign: 'end',
  },
  progressContainer: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(11),
    },
  },
  videoLink: {
    width: '100%',
  },
  videoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.dashboard.text}`,
    alignItems: 'center',
    '& svg': {
      fontSize: '2.2rem',
      marginRight: '15px',
    },
    '&:hover': {
      background: theme.palette.dashboard.text,
      borderRadius: '5px'
    },
  },
  videoData: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImgBgVideo: {
    height: '3vw',
    borderRadius: '3vw',
    marginRight: '15px',
    [theme.breakpoints.down('sm')]: {
      height: '14vw',
    },
  },
  profileImgVideo: {
    margin: '0px auto',
    display: 'block',
    height: '3vw',
    clipPath: 'circle(1.5vw at center)',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '14vw',
      clipPath: 'circle(7vw at center)',
    },
  },
}))

export const TalentCustomProgress = withStyles((theme) => ({
  root: {},
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress)

export const AvailabilitySwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.dashboard.errorLight,
    '&$checked': {
      color: theme.palette.dashboard.success,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.dashboard.successLight,
    },
  },
  checked: {},
  track: {
    backgroundColor: theme.palette.dashboard.text,
  },
}))(Switch)
