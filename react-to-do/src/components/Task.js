import React from 'react'
import { deleteToDo } from '../store/Actions/taskActions'
import { updateToDo } from '../store/Actions/taskActions'
import { connect } from 'react-redux'
import { UpdateSwal, DeleteSwal } from '../helpers/swalFunctions'

const Task = ({ todo, deleteTask, updateTask }) => {
    return (
        <div className="list" key={`todoListItem_${todo._id}`}>
            <div className="collection-item" key={`item_${todo._id}`}>
                <div className="mission-text">
                    <p>{todo.content}</p>
                </div>
                <div className="bottons">
                    <i className="material-icons right deleteIcon" onClick={() => { DeleteSwal(todo, deleteTask) }}>delete</i>
                    <i className="material-icons right editIcon" onClick={() => { UpdateSwal(todo, updateTask) }}>edit</i>
                </div>
            </div>
        </div>
    );
}

const mapDispachToProps = (dispach) => {
    return {
        deleteTask: (todo) => { dispach(deleteToDo(todo)) },
        updateTask: (todo, newContent) => { dispach(updateToDo(todo, newContent)) }
    }
}


export default connect(null, mapDispachToProps)(Task);