import React from 'react'
import SignedInLinks from './SignedInLinks';
import SignOutLinks from './SignedOutLinks';
import SearchTask from '../components/SearchTask'
import '../styles/myZone.css'
import '../styles/navBar.css'

import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth } = props
    let loadedNavbar = auth.uid ? <SignedInLinks /> : <SignOutLinks />
    let searchTask = auth.uid ? <SearchTask/> : null
    return (
        <div className="row">
            <nav className="nav-wrapper blue darken-3 left" >
                <div className="cols6">
                    { searchTask }
                </div>
                <div className="cols6">
                    { loadedNavbar }
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Navbar)