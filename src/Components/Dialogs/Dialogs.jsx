import React from 'react';
import DialogContent from './Content/Content.jsx';
import DialogEdit from './Edit/Edit.jsx';
import DialogCreateFolder from './CreateFolder/CreateFolder.jsx';
import DialogRename from './Rename/Rename.jsx';
import DialogMove from './Move/Move.jsx';
import DialogCopy from './Copy/Copy.jsx';
import DialogUploadFile from './UploadFile/UploadFile.jsx';
import DialogTask from './Task/Task.jsx';

function Dialogs(props) {
    return (
        <div className="Dialogs">
            <DialogContent />
            <DialogEdit />
            <DialogCreateFolder />
            <DialogMove />
            <DialogCopy />
            <DialogRename />
            <DialogUploadFile />
            <DialogTask />
        </div>
    );
}

export default Dialogs;
