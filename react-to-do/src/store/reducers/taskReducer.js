const initState = {
    tasks: [
        {id:'1', owner:'Misha', content:'My first task', date:'Today'},
        {id:'2', owner:'Maayan', content:'My second task', date:'Yesterday'},
        {id:'3', owner:'Zolo', content:'My third task', date:'Apr 19'},
        
    ]
}
const taskReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_TODO' : 
           return{
               tasks:[
                   ...state.tasks,
                   {
                    id: state.tasks.length + 1,
                    owner: action.payload.owner,
                    content: action.payload.content,
                    date: action.payload.date   
                   }
               ]
                           
           }

        default:
        return state;
    }
}
export default taskReducer