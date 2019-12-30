import React from 'react';
import Task from '../Task/Task.jsx';

export default (props) => {
    const { items } = props;
    const taskListComponent = items.map((task, key) => {
        return <Task key={key} name={task.name} status={task.status} />
    })
    return (
        <div>
            { taskListComponent.length ? taskListComponent : <span>Nothing</span> }
        </div>
    );
}