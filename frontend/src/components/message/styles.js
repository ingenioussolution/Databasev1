import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  message: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
