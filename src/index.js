import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import {MainReducer, NotificationReducer} from './Reducers';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import reduxWebsocket from '@giantmachines/redux-websocket';

const reduxWebsocketMiddleware = reduxWebsocket();

const store = createStore(
    combineReducers({
        main: MainReducer,
        notification: NotificationReducer
    }), 
    applyMiddleware(thunk, reduxWebsocketMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
