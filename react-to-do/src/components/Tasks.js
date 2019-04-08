import React from 'react';
import '../styles/tasks.css'
import Task from './Task';
// import $ from 'jquery';

class Tasks extends React.Component {

    render() {
        const { todos } = this.props

        const toDoList = todos.length ?
            (
                todos.map(todo => {
                    return (<Task key={todo.id} todo={todo} />)
                })
            ) : (<p className="center"><b>You have no tasks left</b></p>)

        return (
            <div className="todos collection" id='tasks'>
                {toDoList}
            </div>
        );
    }
}
export default Tasks;
