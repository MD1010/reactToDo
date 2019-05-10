export const addToDo = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('tasks').add({
            ...task
            //can comment after this
        }).then(() => {
            dispatch({ type: 'ADD_TODO', payload: task })
            //here you want to add a reference to document of the task added to 
            //the array of the tasks of the user  
        }).catch((err) => {
            dispatch({ type: 'ADD_ERROR', payload: err })
        })
    }
}

export const deleteToDo = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('tasks').doc(task.id).delete().then(() => {
            dispatch({ type: 'DELETE_TODO', payload: task })
        }).catch((err) => {
            dispatch({ type: 'DELETE_ERROR', payload: err })
        })
    }
}

export const updateToDo = (task, value) => {
    //check why deletion doesnt work
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('tasks').doc(task.id).update({
            content: value
        }).then(() => {
            dispatch({ type: 'UPDATE_TODO', payload: task })
        }).catch((err) => {
            dispatch({ type: 'UPDATE_ERROR', payload: err })
        })
    }
}
export const getMyTasks = (loggedUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        let myTasks = []
        const firestore = getFirestore()
        firestore.collection('tasks').where("ownerFirstName", "==", loggedUser.firstName)
            .where("ownerLastName", "==", loggedUser.lastName)
            .get().then((documents) => {
                console.log("documents",documents)
                documents.foreach((doc) => {
                    //problem that there is id but data doesnt exist
                    myTasks.push(doc.data())
                })
            }).then((data) => {
                console.log("data",data)
                dispatch({ type: "RETRIEVED_TASKS", userTasks: myTasks })
            }).catch((err) => {
                dispatch({ type: "RETRIEVE_FAILED", err })
            })
    }
}
