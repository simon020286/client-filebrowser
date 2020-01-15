import * as APIHandler from '../Api/ApiHandler.js';

/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const uploadFiles = (fileList) => (dispatch, getState) => {
    const { path } = getState();
    dispatch(setLoading(true));
    dispatch(setSelectedFiles([]));
    dispatch(setFileUploadProgress(50));

    APIHandler.uploadFiles(path.join('/'), fileList).then(r => {
        dispatch(setFileUploadProgress(100));
        setTimeout(f => {
            dispatch(resetFileUploader());
        }, 300);
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileList = () => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoading(true));
    dispatch(setSelectedFiles([]));

    APIHandler.getFileList(main.path.join('/')).then(r => {
        dispatch(setLoading(false));
        dispatch(setFileList(r));
    }).catch(r => {
        dispatch(setFileList([]));
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * Request API to get task list then refresh UI
 * @returns {Function}
 */
export const refreshTaskList = () => (dispatch, getState) => {
    APIHandler.getTaskList().then(r => {
        dispatch(setTaskList(r));
    }).catch(r => {
        dispatch(setTaskList([]));
        dispatch(setErrorMessage(r.toString()));
    })
}

/**
 * Request API to get file list for the selected path then refresh UI
 * @returns {Function}
 */
export const refreshFileListSublist = () => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoadingSublist(true));
    dispatch(setSelectedFolderSublist(null));

    APIHandler.getFileList(main.pathSublist.join('/')).then(r => {
        dispatch(setLoadingSublist(false));
        dispatch(setFileListSublist(r));
    }).catch(r => {
        dispatch(setFileListSublist([]));
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoadingSublist(false));
    });
};


/**
 * Request API to get file content then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
export const getFileContent = (fileName) => (dispatch, getState) => {
    const { main } = getState();

    dispatch(setLoading(true));
    dispatch(setFileContent(null));
    dispatch(setVisibleDialogContent(true));
    APIHandler.getFileBody(main.path.join('/'), fileName).then(blob => {
        dispatch(setFileContent(blob));
        dispatch(setLoading(false));
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * Request API to rename file then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
export const renameItem = (fileName, newFileName) => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoading(true));
    APIHandler.renameItem(main.path.join('/'), fileName, newFileName).then(blob => {
        dispatch(setVisibleDialogRename(false));
        dispatch(setLoading(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * Request API to get download file then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
export const downloadFile = (fileName) => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoading(true));
    APIHandler.getFileBody(main.path.join('/'), fileName).then(blob => {
        // TODO workaround large files disables ui for long time
        const blobUrl = window.URL.createObjectURL(blob);
        let tempLink = window.document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.setAttribute('download', fileName);
        tempLink.click();
        window.URL.revokeObjectURL(blobUrl);
        dispatch(setLoading(false));
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * Request API to get file content then dispatch defined events
 * @param {String} fileName
 * @returns {Function}
 */
export const getFileContentForEdit = (fileName) => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoading(true));
    dispatch(setFileContent(null));
    dispatch(setVisibleDialogEdit(true));
    APIHandler.getFileBody(main.path.join('/'), fileName).then(blob => {
        dispatch(setFileContent(blob));
        dispatch(setLoading(false));
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};


/**
 * Request API to create a folder then dispatch defined events
 * @param {String} createFolderName
 * @returns {Function}
 */
export const createNewFolder = (createFolderName) => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setLoading(true));

    APIHandler.createFolder(main.path.join('/'), createFolderName).then(r => {
        dispatch(setVisibleDialogCreateFolder(false));
        dispatch(setLoading(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};


/**
 * Request API to remove an item then dispatch defined events
 * @param {Array} filenames
 * @returns {Function}
 */
export const removeItems = (files) => (dispatch, getState) => {
    const { main } = getState();
    const filenames = files.map(f => f.name);

    dispatch(setLoading(true));
    APIHandler.removeItems(main.path.join('/'), filenames).then(r => {
        dispatch(setLoading(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};


/**
 * Request API to move an item then dispatch defined events
 * @param {Array} filenames
 * @returns {Function}
 */
export const moveItems = (files) => (dispatch, getState) => {
    const { main } = getState();
    const destination = main.pathSublist.join('/') + '/' + main.selectedFolderSublist.name;
    const filenames = files.map(f => f.name);

    dispatch(setLoading(true));
    APIHandler.moveItems(main.path.join('/'), destination, filenames).then(r => {
        dispatch(setLoading(false));
        dispatch(setVisibleDialogMove(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};


/**
 * Request API to copy an item then dispatch defined events
 * @param {Array} filenames
 * @returns {Function}
 */
export const copyItems = (files) => (dispatch, getState) => {
    const { main } = getState();
    const destination = main.pathSublist.join('/') + '/' + main.selectedFolderSublist.name;
    const filenames = files.map(f => f.name);

    dispatch(setLoading(true));
    APIHandler.copyItems(main.path.join('/'), destination, filenames).then(r => {
        dispatch(setLoading(false));
        dispatch(setVisibleDialogCopy(false));
        dispatch(refreshFileList());
    }).catch(r => {
        dispatch(setErrorMessage(r.toString()));
        dispatch(setLoading(false));
    });
};

/**
 * This handles multiple selection by using shift key
 * @param {Object} lastFile
 * @returns {Function}
 */
export const setSelectedFileFromLastTo = (lastFile) => (dispatch, getState) => {
    const { main } = getState();

    const lastPreviouslySelected = [...main.selectedFiles].pop();
    const lastPreviouslySelectedIndex = main.fileList.indexOf(main.fileList.find(f => f.name === lastPreviouslySelected.name))
    const lastSelectedIndex = main.fileList.indexOf(main.fileList.find(f => f.name === lastFile.name))

    let toAdd = [];
    if (lastSelectedIndex > lastPreviouslySelectedIndex) {
        toAdd = main.fileList.filter((index, element) => {
            return main.fileList.indexOf(index) <= lastSelectedIndex && main.fileList.indexOf(index) >= lastPreviouslySelectedIndex
        });
    } else {
        toAdd = main.fileList.filter((index, element) => {
            return main.fileList.indexOf(index) >= lastSelectedIndex && main.fileList.indexOf(index) <= lastPreviouslySelectedIndex
        });
    }
    dispatch(setSelectedFiles([...main.selectedFiles, ...toAdd]));
};


/**
 * @returns {Function}
 */
export const initSubList = () => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setSelectedFolderSublist(null));
    dispatch(setFileListSublist([]));    
    dispatch(setPathSublist([...main.path]));
    dispatch(refreshFileListSublist());
};

export const resetFileUploader = () => (dispatch, getState) => {
    dispatch(setFileUploadProgress(0));
    dispatch(setVisibleDialogUploadFile(false));
    dispatch(setFileUploadList([]));
};

export const resetTaskDialog = () => (dispatch, getState) => {
    dispatch(setVisibleDialogTask(false));
    dispatch(setTaskList([]));
}

export const enterToPreviousDirectory = () => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setPath(main.path.slice(0, -1)));
    dispatch(setFileListFilter(null));
    dispatch(refreshFileList());
};

export const enterToPreviousDirectoryByIndex = (index) => (dispatch, getState) => {
    const { main } = getState();
    const newPath = [...main.path].slice(0, ++index);
    dispatch(setPath(newPath));
    dispatch(refreshFileList());
    dispatch(setFileListFilter(null));
};

export const enterToPreviousDirectorySublist = () => (dispatch, getState) => {
    const { main } = getState();
    dispatch(setPathSublist(main.pathSublist.slice(0, -1)));
    dispatch(refreshFileListSublist());
};

export const setPath = (path) => {
    return {
        type: 'SET_PATH',
        value: path
    };
};

export const setPathSublist = (path) => {
    return {
        type: 'SET_PATH_SUB_LIST',
        value: path
    };
};

export const enterToDirectory = (directory) => (dispatch, getState) => {
    dispatch({
        type: 'ENTER_TO_DIRECTORY',
        value: directory
    });
    dispatch(setFileListFilter(null));
    dispatch(refreshFileList());
};

export const enterToDirectorySublist = (directory) => (dispatch, getState) => {
    dispatch({
        type: 'ENTER_TO_DIRECTORY_SUB_LIST',
        value: directory
    });
    dispatch(refreshFileListSublist());
};

export const setFileList = (fileList) => {
    return {
        type: 'SET_FILE_LIST',
        value: fileList
    };
};

export const setTaskList = (taskList) => {
    return {
        type: 'SET_TASK_LIST',
        value: taskList
    }
}

export const setFileListSublist = (fileList) => {
    return {
        type: 'SET_FILE_LIST_SUB_LIST',
        value: fileList
    };
};

export const setSelectedFiles = (files) => {
    return {
        type: 'SET_SELECTED_FILES',
        value: files
    };
};

export const setSelectedFolderSublist = (file) => {
    return {
        type: 'SET_SELECTED_FOLDER_SUB_LIST',
        value: file
    };
};

export const setFileListFilter = (search) => {
    return {
        type: 'SET_FILE_LIST_FILTER',
        value: search
    };
};

export const setContextMenuVisible = (visible) => {
    return {
        type: 'SET_CONTEXT_MENU_VISIBLE',
        value: !!visible
    };
};

export const setContextMenuPosition = (x, y) => {
    return {
        type: 'SET_CONTEXT_MENU_POSITION',
        value: [x, y]
    };
};

export const setContextMenuPositionElement = (element) => {
    return {
        type: 'SET_CONTEXT_MENU_POSITION_ELEMENT',
        value: element
    };
};

export const toggleSelectedFile = (file) => {
    return {
        type: 'TOGGLE_SELECTED_FILE',
        value: file
    };
};

export const rightClickOnFile = (file) => (dispatch, getState) => {
    const { main } = getState();
    const isSelected = main.selectedFiles.indexOf(main.selectedFiles.find(f => f.name === file.name)) !== -1;

    !isSelected && dispatch(setSelectedFiles([file]));
};

export const setLoading = (value) => {
    return {
        type: 'SET_LOADING',
        value: value
    };
};

export const setLoadingSublist = (value) => {
    return {
        type: 'SET_LOADING_SUB_LIST',
        value: value
    };
};

export const setVisibleDialogCreateFolder = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_CREATE_FOLDER',
        value: !!visible
    };
};

export const setVisibleDialogUploadFile = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_UPLOAD_FILE',
        value: !!visible
    };
};

export const setVisibleDialogRename = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_RENAME',
        value: !!visible
    };
};

export const setVisibleDialogMove = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_MOVE',
        value: !!visible
    };
};

export const setVisibleDialogCopy = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_COPY',
        value: !!visible
    };
};

export const setVisibleDialogContent = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_CONTENT',
        value: !!visible
    };
};

export const setVisibleDialogTask = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_TASK',
        value: !!visible
    };
};

export const setVisibleDialogEdit = (visible) => {
    return {
        type: 'SET_VISIBLE_DIALOG_EDIT',
        value: !!visible
    };
};

export const setFileContent = (blob) => {
   return {
        type: 'SET_FILE_CONTENT',
        value: blob
    };
};

export const setFileUploadProgress = (percentage) => {
   return {
        type: 'SET_FILE_UPLOAD_PROGRESS',
        value: percentage
    };
};

export const setFileUploadList = (files) => {
   return {
        type: 'SET_FILE_UPLOAD_LIST',
        value: files
    };
};

export const setErrorMessage = (message) => {
    return {
        type: 'SET_ERROR_MSG',
        value: message
    }
}

export const closeNotification = (id) => {
    return {
        type: 'CLOSE_NOTIFICATION',
        value: id
    }
}