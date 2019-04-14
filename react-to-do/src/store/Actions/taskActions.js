export const addToDo = (task) => {
    // comes here before submittion
    return (dispatch, getState) => {
        //make a async call to database
        dispatch({ type: 'ADD_TODO', payload:task})
    }
}

