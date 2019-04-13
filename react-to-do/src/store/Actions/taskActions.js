export const addToDo = (task) => {
    // comes here before submittion
    // alert(task.content)
    return (dispatch, getState) => {
        //make a async call to database
        dispatch({ type: 'CREATE_TASK', task})
    }
}

