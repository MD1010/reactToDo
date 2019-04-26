import React, { Component } from 'react'
import '../styles/search.css'
import swal from 'sweetalert';

class SearchTask extends Component {

    searchTask = () => {
        swal("need to write search function")
    }

    render() {
        return (
            <form className="searchForm left">
                <div className="input-field">
                    <i onClick={this.searchTask} className="material-icons prefix white-text searchIcon">search</i>
                    <input className="materialize-textarea searchBox" placeholder="search a task..."></input>
                </div>
            </form>
        )
    }
}
export default SearchTask