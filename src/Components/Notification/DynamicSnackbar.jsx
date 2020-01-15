import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { setErrorMessage } from '../../Actions/Actions';


const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class DynamicSnackbar extends React.Component {
  render() {
    const { classes, errorMsg, handleClose, open, notificationDuration } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={notificationDuration}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errorMsg}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose} >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

DynamicSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const { main } = state;
    return {
        open: !!main.errorMsg,
        errorMsg: main.errorMsg,
        notificationDuration: main.notificationDuration || 6000
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setErrorMessage(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DynamicSnackbar));

