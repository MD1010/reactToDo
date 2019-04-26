import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../styles/myZone.css'
class MyZone extends Component {

  render() {
    const { tasks } = this.props
    return (
      <React.Fragment>
        <div className="TaskZone">
          {/* <div className="background" /> */}
          <div className="MyTasks" >
            <Tasks todos={tasks} />
          </div>
        </div>
        <CreateTask />
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state) => {
  if (state.firestore.ordered.tasks) {
    return {
      tasks: state.firestore.ordered.tasks
    }
  }
  else
    return {
      tasks: []
    }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'tasks' }
  ])
)(MyZone);
