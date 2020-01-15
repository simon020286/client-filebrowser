import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSublist from '../../File//FileSublist/FileSublist.jsx'; 
import Loader from '../../Loader/Loader.jsx'; 
import FileListEmptyMessage from '../FileListEmptyMessage';
import './FileListSublist.css'; 

class FileListSublist extends Component {
    render() {
        const { fileList, loadingSublist } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            return <FileSublist type={file.type} name={file.name} key={key} />
        });

        return <div className="FileListSublist">
            { loadingSublist ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    const { main } = state;
    const filteredList = main.fileListSublist
        .filter(file => file.type === 'dir')
        .filter(file => main.path.join('').trim() === main.pathSublist.join('').trim() ? 
            !main.selectedFiles.find(f => f.name === file.name) : true
        );
    return {
        fileList: filteredList,
        loadingSublist: main.loadingSublist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListSublist);