export const addToDo = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('tasks').add({
            ...task
            //can comment after this
        }).then(() => {
            //add the task to the user array of tasks \


            // let loggedUserTasks = []
            // firestore.collection('tasks').where("ownerFirstName", "==", loggedInFirstName)
            //     .where("ownerLastName", "==", loggedInLastName).get().then((documents) => {
            //       documents.docs.forEach(doc => {
            //           loggedUserTasks.push(doc.id)
            //       });

            //     }).then(()=>{

            //     })
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
export const getMyTasks = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        let myTasksIDS = []
        let myTasks = []
        const loggedInFirstName = getState().firebase.profile.firstName
        const loggedInLastName = getState().firebase.profile.lastName
        const allTasks = getState().firestore.ordered.tasks
        const firestore = getFirestore()
        console.log("in getTasks !",loggedInFirstName)
        if (loggedInFirstName && loggedInLastName) {
            firestore.collection('tasks').where("ownerFirstName", "==", loggedInFirstName)
                .where("ownerLastName", "==", loggedInLastName)
                .get().then((documents) => {
                    documents.docs.forEach(doc => {
                        myTasksIDS.push(doc.id)
                    });
                }).then(() => {
                    myTasksIDS.forEach((taskID) => {
                        allTasks.forEach((task) => {
                            if (task.id === taskID) {
                                myTasks.push(task)
                            }
                        })
                    })
                }).then(() => {
                    console.log("about to dispach!")
                    dispatch({ type: "RETRIEVE_TASKS", userTasks: myTasks })
                })
                .catch((err) => {
                    dispatch({ type: "RETRIEVE_FAILED", err })
                })
        }
    }
}
