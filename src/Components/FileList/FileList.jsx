import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from '../File/File.jsx'; 
import FileListEmptyMessage from './FileListEmptyMessage';
import Loader from '../Loader/Loader.jsx'; 
import './FileList.css';

class FileList extends Component {
    render() {
        const { fileList, loading } = this.props;
        
        const fileListComponent = fileList.map((file, key) => {
            return <File type={file.type} name={file.name} editable={file.editable} size={file.size} key={key} />
        });

        return <div className="FileList">
            { loading ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    const { main } = state;
    const filteredList = main.fileList.filter(
        file => main.fileListFilter ? file.name.toLocaleLowerCase().match(main.fileListFilter.toLocaleLowerCase()) : true
    );
    return {
        fileList: filteredList,
        loading: main.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


