import React, { Component } from "react";
import "../styles/search.css";
import { connect } from "react-redux";
import { FilterTasks } from "../store/Actions/taskActions";

class SearchTask extends Component {
  

  handleSearch = event => {
    this.props.Filter(event.target.value);
  };

  render() {
    return (
      <form className="searchForm left">
        <div className="input-field">
          <i className="material-icons prefix white-text searchIcon">search</i>
          <input
            className="materialize-textarea searchBox"
            placeholder="search a task..."
            onChange={this.handleSearch}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  if (state.firestore.ordered.tasks) {
    return {
      tasks: state.task.tasks
    };
  } else
    return {
      tasks: null
    };
};

const mapDispachToProps = dispach => {
  return {
    Filter: (input) => {
      dispach(FilterTasks(input));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(SearchTask);
