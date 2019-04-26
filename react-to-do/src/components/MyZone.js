import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../styles/myZone.css'
import { $, jQuery } from 'jquery'

class MyZone extends Component {

  render() {
    const { tasks } = this.props
    return (
      <React.Fragment>
        <div className={tasks == null ? "spinner" : ""}></div>
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
  // console.log("from mapStateConnectedToFireBase",state)

  if (state.firestore.ordered.tasks) {
    return {
      tasks: state.firestore.ordered.tasks
    }
  }
  else
    return {
      tasks: null
    }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'tasks' }
  ])
)(MyZone);
