import React from 'react'
import { deleteToDo } from '../store/Actions/taskActions'
import { updateToDo } from '../store/Actions/taskActions'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

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
const DeleteSwal = (todo, deleteFunction) => {
    Swal.fire({
        type:'warning',
        text: 'Are you sure you want to delete the task?',
        showCancelButton: true,
        position: "center",
        heightAuto: false,

    }).then((result) => {
        if (result.value) {
            deleteFunction(todo)
            Swal.fire({
                type: 'error',
                text: " Your task was deleted successfuly!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    })
}

const UpdateSwal = (todo, updateFunction) => {
    Swal.fire({
        input: 'text',
        inputPlaceholder: 'Type your new task here...',
        showCancelButton: true,
        position: "center",
        heightAuto: false,

    }).then((result) => {
        let newContent = result.value
        if (result.value) {
            updateFunction(todo, newContent)
            Swal.fire({
                type: 'info',
                text: " Your task was edited successfuly!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    })
}

const mapDispachToProps = (dispach) => {
    return {
        deleteTask: (todo) => { dispach(deleteToDo(todo)) },
        updateTask: (todo, newContent) => { dispach(updateToDo(todo, newContent)) }
    }
}


export default connect(null, mapDispachToProps)(Task);