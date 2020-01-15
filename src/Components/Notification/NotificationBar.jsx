import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { closeNotification } from '../../Actions/Actions';

function MySnackbar(props) {
  const { open, handleClose, message, id} = props

  return (
    <Snackbar 
      open={open} 
      // autoHideDuration={6000} 
      // onClose={e => handleClose(e, id)} 
      message={message}
      action={
      <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={e => handleClose(e, id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
    />
  );
}

const NotificationBar = (props) => {
  const { notifications, handleClose } = props;
  const  snacks = notifications.map(notification => 
    <MySnackbar 
      key={notification.id}
      id={notification.id}
      message={notification.content}
      open={true}
      handleClose={handleClose}
    />
  );
  return (
    <div>
      {snacks}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { notification } = state;
  return {
      notifications: notification.notifications
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: (event, id) => {
      dispatch(closeNotification(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);