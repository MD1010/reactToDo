import React, { Component } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { getMyTasks } from '../store/Actions/taskActions'

import '../styles/myZone.css'

class MyZone extends Component {

  render() {
    const { tasks, auth } = this.props
    if (auth) {
      if (!auth.uid) return <Redirect to='/SignIn'></Redirect>
      // let { retrieveTasks, profile } = this.propss
      if(auth.uid) this.props.retrieveTasks()
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
  console.log(state)
  if (state.firestore.ordered.tasks) {
    return {
      //check how to get the tasks of specific user not all the tasks
      tasks: state.task.tasks,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    }
  }
  else
    return {
      tasks: null,
      auth: null
    }
}

const mapDispachToProps = (dispach) => {
  return {
    retrieveTasks: () => { dispach(getMyTasks()) }
  }
}
export default compose(
  connect(mapStateToProps, mapDispachToProps),
  firestoreConnect([
    { collection: 'tasks' }
  ])
)(MyZone);
