import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import SearchTask from '../components/SearchTask'
import { connect } from 'react-redux'
import '../styles/myZone.css'
class MyZone extends Component {

  render() {
    const { tasks } = this.props
    return (

      <div className="TaskZone">
        {/* <div className="background" /> */}
        <SearchTask />
        <div className="MyTasks">
          <Tasks todos={tasks} />
        </div>
        <CreateTask />
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
