import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

export default (props) => {
    const {name, status} = props;
    return (
        <div>
            <ListItem>
                <ListItemText primary={name} secondary={status}></ListItemText>
            </ListItem>
        </div>
    );
}