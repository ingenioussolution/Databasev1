import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Message = ({ severity, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.message}>
      <Alert severity={severity}>{children}</Alert>
    </div>
  );
};

Message.defaultProps = {
  severity: 'info',
};

export default Message;