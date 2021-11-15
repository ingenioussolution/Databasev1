import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    wrapper: {
        width: '100%',
      },
    root: {
        flexGrow: 1,
    },

    card: {
        width: '100%',
      },
    cardTitle: {
        padding: `${theme.spacing(2)} !important`,
        [theme.breakpoints.down('sm')]: {
          padding: `${theme.spacing(6)} !important`,
        },
      },

}))