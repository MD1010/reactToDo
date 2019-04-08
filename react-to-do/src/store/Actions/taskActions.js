export const createTask = (task) => {
    return (dispatch, getState) => {
        //make a async call to database
        dispatch({ type: 'CREATE_TASK', task})
    }
}

