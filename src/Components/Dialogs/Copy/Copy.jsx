import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleDialogCopy, setSelectedFolderSublist, enterToPreviousDirectorySublist, copyItems } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { 
            selectedPath, handleClose, handleSave, open, 
            canGoBack, canCopy, selectedFiles, handleGoBack 
        } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-copy" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-copy">
                        Copy files to <small style={{color: 'grey'}}>{ selectedPath.join('/') }</small>
                    </DialogTitle>
                    <DialogContent>
                        <FileListSublist />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleGoBack} color="primary" type="button" disabled={!canGoBack}>
                            <KeyboardArrowLeftIcon /> Go back directory
                        </Button>

                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={(e) => handleSave(e, selectedFiles)} disabled={!canCopy} type="submit">
                            Copy
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    const { main } = state;
    // prevent copying to same folder
    const canCopy = main.path.join('') !== main.pathSublist.join('') + (main.selectedFolderSublist ? main.selectedFolderSublist.name : '');

    return {
        open: main.visibleDialogCopy,
        selectedFolderSublist: main.selectedFolderSublist,
        selectedPath: main.selectedFolderSublist ? [...main.pathSublist, main.selectedFolderSublist.name] : [],
        canGoBack: main.pathSublist.length,
        canCopy: main.selectedFolderSublist && canCopy,
        selectedFiles: main.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleDialogCopy(false));
        },
        handleSave: (event, selectedFiles) => {
            event.preventDefault();
            dispatch(copyItems(selectedFiles));
        },
        handleGoBack: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(enterToPreviousDirectorySublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
