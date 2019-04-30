import React from 'react'
import SignedInLinks from './SignedInLinks';
import SignOutLinks from './SignedOutLinks';
import SearchTask from '../components/SearchTask'
import '../styles/myZone.css'
import '../styles/navBar.css'

import { connect } from 'react-redux'

const Navbar = () => {
    return (
        <div className="row">
            <nav className="nav-wrapper blue darken-3 left" >
                <div className="cols6">
                    <SearchTask />
                </div>
                <div className="cols6">
                    <SignedInLinks />
                    <SignOutLinks />
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{

    }
}
export default connect(mapStateToProps)(Navbar)