import React from 'react'
import '../styles/style.css';
import Task from './Task';

const Tasks = ({todos, deleteItem, editItem, limitMissionsToDisplay, startIndexMission}) =>
{
   
    const toDoList = todos.length ? 
    (
        todos.slice(startIndexMission, startIndexMission + limitMissionsToDisplay).map(todo =>
        {
        
         return(
                <Task key={todo._id} 
                        todo={todo} 
                        deleteItem={deleteItem} 
                        editItem={editItem}/>
                )
               
          
        })
    ) 
    :(
        <p className="center"><b>You have no tasks left</b></p>
    )

    return (
        <div className="todos collection" id='tasks'>
            {toDoList}
        </div>  
    );
   
}
export default Tasks;
