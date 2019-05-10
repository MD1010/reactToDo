// const initState = {
//     tasks: []
// }

// this reducer is useless since it's aim is to add 
//properties to the store that can be accesed by other components
// and it doesnt add anything since the operations to the tasks are made by firebase
const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
        console.log("task",state)
            return state
                // tasks: [
                //     ...state.tasks,
                //     {
                //         ownerFirstName: action.payload.ownerFirstName,
                //         ownerLastName: action.payload.ownerLastName,
                //         content: action.payload.content,
                //         date: action.payload.date
                //     }
                // ]

            
        case 'ADD_ERROR':
            console.log('create project error', action.payload)
            return state
        case 'DELETE_TODO':
            return state
        case 'RETRIEVE_TASKS':
            return {
                tasks: action.userTasks
            }
        case 'RETRIEVE_FAILED':
            console.log("failed to retrieve any tasks",action.err.message);
            return state
        default:
            return state
    }
}
export default taskReducer
