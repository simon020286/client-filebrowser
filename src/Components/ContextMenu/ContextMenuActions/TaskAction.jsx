import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { setVisibleDialogTask, refreshTaskList} from '../../../Actions/Actions.js';

function TaskAction(props) {
    const {handleClick, handleClose} = props;

    const handleCloseAfter = (callback) => (event) => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ListItemIcon>
                <FileCopyIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Task
            </Typography>
        </MenuItem>        
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (event) => {
            dispatch(refreshTaskList());
            dispatch(setVisibleDialogTask(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAction);
