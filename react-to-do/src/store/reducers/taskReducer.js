const initState = {
    tasks: [
        {id:'1', owner:'Misha', content:'My first task', date:'Today'},
        {id:'2', owner:'Maayan', content:'My second task', date:'Yesterday'},
        {id:'3', owner:'Zolo', content:'My third task', date:'Apr 19'}
    ]
}
const taskReducer = (state = initState, action) => {
    return state
}

export default taskReducer
