import { defaultState } from './state';

/**
 * Main content reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const NotificationReducer = (state = defaultState, action) => {
    let notifications;
    switch (action.type) {
        case 'REDUX_WEBSOCKET::OPEN': 
            return Object.assign({}, state, {
                wsConnected: true
            });
        case 'REDUX_WEBSOCKET::CLOSED': 
            return Object.assign({}, state, {
                wsConnected: false
            });
        case 'REDUX_WEBSOCKET::MESSAGE':
            const message = JSON.parse(action.payload.message);
            notifications = state.notifications.slice();
            notifications.push({id: message.id, content: message.data.name})
            return { ...state, notifications};
        case 'CLOSE_NOTIFICATION': 
            notifications = state.notifications.filter((notification) => {
                return notification.id !== action.value;
            });
            return { ...state, notifications };
        default:
            return state;
    }
}

export default NotificationReducer;