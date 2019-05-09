import Swal from 'sweetalert2'

const makeConfirmationSwal = () => {
    Swal.fire({
        type: 'success',
        text: "Your task was successfully added!",
        toast: true,
        position: "top-right",
        timer: 2000,
        showConfirmButton: false,
    });
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
                text: " Your task was deleted successfully!",
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
                text: " Your task was edited successfully!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    })
}
export { makeConfirmationSwal, DeleteSwal, UpdateSwal}
