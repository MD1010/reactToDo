const initState = {
    tasks: []
}
const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                tasks: [
                    ...state.tasks,
                    {
                        ownerFirstName: action.payload.ownerFirstName,
                        ownerLastName: action.payload.ownerLastName,
                        content: action.payload.content,
                        date: action.payload.date
                    }
                ]

            }
        case 'ADD_ERROR':
            console.log('create project error', action.payload)
            return state
        case 'DELETE_TODO':
            return state
        default:
            return state
    }
}
export default taskReducer
