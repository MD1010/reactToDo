import React, { Component } from 'react'
import '../styles/search.css'
import swal from 'sweetalert';

class SearchTask extends Component {

    searchTask = () => {
        swal("need to write search function")
    }

    render() {
        return (
            <div className="row">
                <form className="searchForm">
                    <div className="input-field col s12">
                        <i onClick={this.searchTask} className="material-icons prefix white-text">search</i>
                        <input className="materialize-textarea searchBox"></input>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchTask