import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paperStyle:{
    padding :'50px',
    height:'70vh',
    maxWidth:'50vw',
    width:'100%',
    margin:"20px auto",
    [theme.breakpoints.down('md')]: {
        maxWidth:'70vw',
        padding :'20px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth:'90vw',
        padding :'0px',
    },
  },

  avatarStyle : { backgroundColor: '#1bbd7e' },

  btnStyle:{ 
      margin: '8px 0',
      width: '100%',
      backgroundColor: '#673ab7' ,
      border: `1px solid ${theme.palette.dashboard.primary} !important`,
      color:'#fff',
    '&:hover':{
        border: '1px solid  #673ab7 !important',
        backgroundColor: '#673ab7c2',
        color: '#000',
 
    },
    },

    loginInput:{
        backgroundColor:'#fff !important',
    },
//----------------------
    formWrapper: {
        maxWidth:'50vw',
        padding :'50px',
        minHeight: '60vh',
        margin:"20px auto",
        [theme.breakpoints.down('md')]: {
            maxWidth:'60vw',
            minHeight: '70vh',
            padding :'20px',
          },
        [theme.breakpoints.down('sm')]: {
          maxWidth:'80vw',
          minHeight: '70vh',
        },
      },
      formHeader: {
        justifyContent: 'center',
        display: 'flex',
      },
      form: {
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(8),
        },
      },
      formContent: {
        margin: '0 !important',
      },
      submitWrapper: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          marginTop: theme.spacing(10),
        },
      },
      error: {
        marginTop: theme.spacing(4),
      },
}))
