const initState = {
    tasks: [
        {id:'1', owner:'Misha', title:'My first task', content:'First content is here'},
        {id:'2', owner:'Maayan', title:'My second task', content:'Second content is here'},
        {id:'3', owner:'Zolo', title:'My third task', content:'Third content is here'}
    ]
}
const taskReducer = (state = initState, action) => {
    return state
}

export default taskReducer
