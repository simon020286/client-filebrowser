import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TaskList from '../../TaskList/TaskList.jsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { refreshTaskList, resetTaskDialog } from '../../../Actions/Actions.js';

class FormDialog extends Component {

    render() {
        const { handleClose, handleRefresh, open, taskList } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-upload" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-upload">
                        Task list
                    </DialogTitle>
                    <DialogContent>
                        <TaskList items={taskList}></TaskList>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleRefresh} type="button">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.visibleDialogTask,
        taskList: state.taskList
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(resetTaskDialog());
        },
        handleRefresh: (event) => {
            event.preventDefault();
            dispatch(refreshTaskList());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
