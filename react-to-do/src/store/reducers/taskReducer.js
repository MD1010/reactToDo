const initState = {
  tasks: [],
  retrieved: false,
  filteredTasks: []
};

// this reducer is useless since it's aim is to add
//properties to the store that can be accesed by other components
// and it doesnt add anything since the operations to the tasks are made by firebase
const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log("task", state);
      return state
    case "ADD_ERROR":
      console.log("create project error", action.payload);
      return state;
    case "DELETE_TODO":
      return state
    case "RETRIEVE_TASKS":
      console.log("IN THE REDUCER!", action.userTasks);
      return {
        tasks: action.userTasks,
        retrieved: true
      };
  case "RETRIEVE_STATUS":
    return{
      
      retrieved:false
    }
    case "RETRIEVE_FAILED":
      console.log("failed to retrieve any tasks", action.err.message);
      return state;

    case "FILTER_TASKS":
      return {
        ...state,
        filteredTasks : state.tasks.filter((element) => element.content.indexOf(action.payload) !== -1)
      }
    default:
      return state;
  }
};
export default taskReducer;
