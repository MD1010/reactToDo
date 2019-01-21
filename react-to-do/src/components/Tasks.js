import React from 'react';
import Task from './Task';
import $ from 'jquery';

class Tasks extends React.Component{
   
    componentDidMount(){
        let oneTaskDivHeight = 55
        let tasksTopHeight = $("#tasks").offset().top
        let allScreenHeight = $(document).height() - 150
        let divTasksHeight = allScreenHeight - tasksTopHeight
        let maxNumberOfMissions = Math.round(divTasksHeight / oneTaskDivHeight)
        this.props.setMaxAmmountOfMissions(maxNumberOfMissions)
    }
    render(){
        const {todos, deleteItem, editItem, limitMissionsToDisplay, startIndexMission} = this.props
        
        const toDoList = todos.length ? 
        (
            todos.slice(startIndexMission, startIndexMission + limitMissionsToDisplay).map(todo =>
            {
             return(
                    <Task 
                            key={todo._id} 
                            todo={todo} 
                            deleteItem={deleteItem} 
                            editItem={editItem}/>
                    )
                   
              
            })
        ) 
        :(
            <p className="center"><b>You have no tasks left</b></p>
        )
    
        return (
            <div className="todos collection" id='tasks'>
                {toDoList}
            </div>  
        );
    }
}
export default Tasks;
