import React, { Component } from 'react';
import config from './config.js';
import FileList from './Components/FileList/FileList.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ContextMenu from './Components/ContextMenu/ContextMenu.jsx';
import Dialogs from './Components/Dialogs/Dialogs.jsx';

import { MuiThemeProvider as MaterialUI, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { setContextMenuVisible, refreshFileList } from './Actions/Actions.js';
import DynamicSnackbar from './Components/Notification/DynamicSnackbar.jsx'; 
import NotificationBar from './Components/Notification/NotificationBar.jsx';

import { connect as websocketConnect } from '@giantmachines/redux-websocket';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends Component {

    componentDidMount() {
        this.props.init();
        this.props.wsConnect();
    };

    render() {
        const {handleHideContextMenu} = this.props;
        return (
            <MaterialUI theme={theme}>
                <div onClick={handleHideContextMenu} onContextMenu={handleHideContextMenu}>
                    <Navbar />
                    <FileList />
                    <ContextMenu />
                    <DynamicSnackbar />
                    <NotificationBar />
                    <Dialogs />
                </div>
            </MaterialUI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(refreshFileList());
        },

        handleHideContextMenu: (event) => {
            if (! (event.target.tagName === 'INPUT' || /label/i.test(event.target.className))) {
                event.preventDefault();
            }
            dispatch(setContextMenuVisible(false));
        },

        wsConnect: () => {
            setTimeout(() => dispatch(websocketConnect(config.url_ws)), 1);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
