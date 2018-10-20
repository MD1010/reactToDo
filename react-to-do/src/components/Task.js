import React from 'react'
const Task = ({todo,deleteItem,editItem}) =>
{
    return(
        <div className="list" key={todo.id}>
                <div className="collection-item" key={todo.id}>
                    <b><span>{todo.content}</span></b>
                    <i className="material-icons right deleteIcon" onClick={()=>{deleteItem(todo.id)}}>delete</i>
                    <i className="material-icons right editIcon"onClick={()=>{editItem(todo.id)}}>edit</i>
                </div>
        </div>
    );
}
export default Task;