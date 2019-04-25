import React from 'react';
import '../styles/tasks.css'
import Task from './Task';

class Tasks extends React.Component {

    render() {
        const { todos } = this.props
        // console.log("the todos are:",todos)
        
               const myToDoList = todos && todos.map(todo => {
                    return (<Task key={todo.id} todo={todo} />)
                })
            

        return (
            <div className="todos collection" id='tasks'>
                { myToDoList}
            </div>
        );
    }
}
export default Tasks;
