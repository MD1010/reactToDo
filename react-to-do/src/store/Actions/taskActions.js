export const addToDo = (task) => {
    // comes here before submittion
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('tasks').add({
            ...task
        }).then(() => {
            dispatch({ type: 'ADD_TODO', payload: task })
            //here you want to add a reference to document of the task added to 
            //the array of the tasks of the user  
        }).catch((err)=> {
            dispatch({ type: 'ADD_ERROR', payload: err})
        })
    }
}

