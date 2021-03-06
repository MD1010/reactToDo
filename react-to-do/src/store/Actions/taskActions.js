export const addToDo = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tasks")
      .add({
        ...task
      })
      .then(() => {
        dispatch(getMyTasks())
      })
  };
};

export const deleteToDo = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        dispatch(getMyTasks())
      }).then(()=>{
        dispatch({ type: "DELETE_TODO", payload: task });
      })
      .catch(err => {
        dispatch({ type: "DELETE_ERROR", payload: err });
      });
  };
};

export const updateToDo = (task, value) => {
  //check why deletion doesnt work
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tasks")
      .doc(task.id)
      .update({
        content: value
      }).then(() => {
        dispatch(getMyTasks())
      })
      .then(() => {
        dispatch({ type: "UPDATE_TODO", payload: task });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_ERROR", payload: err });
      });
  };
};
export const getMyTasks = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let myTasksIDS = [];
    let myTasks = [];
    const loggerUserID = getState().firebase.auth.uid;
    const allTasks = getState().firestore.ordered.tasks;
    const firestore = getFirestore();
    if (loggerUserID) {
      firestore
        .collection("tasks")
        .where("ownerID", "==", loggerUserID)
        .get()
        .then(documents => {
          documents.docs.forEach(doc => {
            myTasksIDS.push(doc.id);
          });
          //get the actual tasks with the specific ids
        })
        .then(() => {
          myTasksIDS.forEach(taskID => {
            allTasks.forEach(task => {
              if (task.id === taskID) {
                myTasks.push(task);
              }
            });
          });
        })
        .then(() => {
          console.log("about to dispach!");
          dispatch({ type: "RETRIEVE_TASKS", userTasks: myTasks });
        })
        .catch(err => {
          dispatch({ type: "RETRIEVE_FAILED", err });
        });
    }
  };
};

export const FilterTasks = input => {
  return dispach => {
    dispach({ type: "FILTER_TASKS", payload: input });
  };
};
