import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  tableHeader: {
    borderBottom: '1px solid #eeeeee',
    padding: theme.spacing(2),
  },
  tableHead: {
    color: theme.palette.dashboard.dark,
    fontWeight: 'bold',
  },
  actionsContainer: {
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'space-around !important',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
      justifyContent: 'space-around !important',
    },
    '& button': {
      width: '100%',
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
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
  toolbarBtn: {
    height: 'auto',
  },
  bulkMenuWrapper: {
    zIndex: '99',
  },
  bulkMenu: {
    padding: '0px',
  },
  addBtn: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  downloader: {
    display: 'contents',
    '& button': {
      minHeight: '38px',
    },
  },

  paperCheck:{
    justifyItems: 'center',
    justifyContent: 'left',
    display: 'flex',
    boxShadow: '0px !important'
  },

  upload:{
    margin: "30px",
  },


  filtersSection: {
    padding: theme.spacing(4),
  },
}))
