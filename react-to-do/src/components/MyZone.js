import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import '../styles/myZone.css'

class MyZone extends Component {

  render() {
    const { tasks, auth } = this.props
    if (auth) {
      if (!auth.uid) return <Redirect to='/SignIn'></Redirect>
    }
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
//get the property from the reducer 'tasks' that gets the tasks of the logged user
const mapStateToProps = (state) => {
  if (state.firestore.ordered.tasks) {
    return {
      tasks: state.firestore.ordered.tasks,
      auth: state.firebase.auth
    }
  }
  else
    return {
      tasks: null,
      auth: null
    }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'tasks' }
  ])
)(MyZone);
