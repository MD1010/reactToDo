const initState = {
    tasks: [
        { ownerFirstName: 'bla', ownerLastName: 'bla', content: 'My first task', date: 'Today' },
        { ownerFirstName: 'bla', ownerLastName: 'bla', content: 'My second task', date: 'Yesterday' },
        { ownerFirstName: 'bla', ownerLastName: 'bla', content: 'My third task', date: 'Apr 19' },

    ]
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

        default:
            return state
    }
}
export default taskReducer
