import React from 'react'

const Tasks = ({todos,deleteItem}) =>
{
    const toDoList = todos.length ? (
        todos.map(todo =>{
            return(
            <div className="collection-item" key={todo.id} onClick={()=>{deleteItem(todo.id)}}>
            <span>{todo.content}</span>
            </div>
            )
        })
    ) :(
        <p className="center">You have no todos left!</p>
    )

    return (
        <div className="todos collection">
        {toDoList}
        </div>  
    );
}
export default Tasks;