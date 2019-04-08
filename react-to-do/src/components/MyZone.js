import React, { Component } from 'react'
import Tasks from './Tasks'
import Title from './Title'
import CreateTask from './CreateTask'
// import swal from 'sweetalert'
import { connect } from 'react-redux'
import '../styles/myZone.css'
class MyZone extends Component {

  render() {
    const { tasks } = this.props
    return (
      <div className="container">
        <Title />
        <div className="TaskZone">
          <div className="MyTasks">
            <Tasks todos={tasks} />
          </div>
          <div className="newTaskForm">
            <CreateTask />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks
  }
}

export default connect(mapStateToProps)(MyZone);
