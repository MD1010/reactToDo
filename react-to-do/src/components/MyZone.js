import React, { Component } from 'react';
import Tasks from './Tasks';
import Title from './Title';
// import { findElement, deleteData, postData, putData, getData } from '../helpers/utils';
// import swal from 'sweetalert';
import { connect } from 'react-redux'

class MyZone extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="container">
        <Title />
        <Tasks todos = {this.props.tasks}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    tasks: state.task.tasks
  }
}

export default connect(mapStateToProps)(MyZone);
