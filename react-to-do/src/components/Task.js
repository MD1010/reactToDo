import React from 'react'
const Task = ({todo,deleteItem,editItem}) =>
{
    return(
        <div className="list" key={`todoListItem_${todo._id}`}>
                <div className="collection-item" key={`item_${todo._id}`}>
                    <div className="mission-text">
                        <p>{todo.content}</p>
                    </div>
                    <div className="bottons">
                        <i className="material-icons right deleteIcon" onClick={()=>{deleteItem(todo._id)}}>delete</i>
                        <i className="material-icons right editIcon"onClick={()=>{editItem(todo._id)}}>edit</i>
                    </div>
          </div>
        </div>
    );
}
export default Task;