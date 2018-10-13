import React from 'react'
import './styles/style.css';

const Tasks = ({todos,deleteItem,editItem}) =>
{
    const toDoList = todos.length ? (
        todos.map(todo =>{
            return(
            <div className="list" key={todo.id}>
                <div className="collection-item" key={todo.id}>
                <b><span>{todo.content}</span></b>
                <i className="material-icons right deleteIcon" onClick={()=>{deleteItem(todo.id)}}>delete</i>
                <i className="material-icons right editIcon"onClick={()=>{editItem(todo.id)}}>edit</i>
            </div>
            </div>
                       
            )
        })
    ) :(
        <p className="center"><b>You have no tasks left</b></p>
    )

    return (
        <div className="todos collection">
        {toDoList}
        </div>  
    );
}
export default Tasks;
