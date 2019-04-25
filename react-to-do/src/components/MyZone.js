import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import SearchTask from '../components/SearchTask'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../styles/myZone.css'
class MyZone extends Component {

  render() {
    const { tasks } = this.props
    return (

      <div className="TaskZone">
        {/* <div className="background" /> */}
        <SearchTask />
        <div className="MyTasks" >
          <Tasks todos={tasks}/>
        </div>
        <CreateTask />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if(state.firestore.ordered.tasks){
    return {
      tasks: state.firestore.ordered.tasks
    }
  }
  else 
  return{
      tasks: []
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection : 'tasks'} 
  ]) 
)(MyZone);
