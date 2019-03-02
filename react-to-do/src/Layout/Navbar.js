import React from 'react'
import SignedInLinks from './SignedInLinks';
import SignOutLinks from './SignedOutLinks';
import '../styles/navBar.css'
const Navbar = () =>
{
    return(
        <nav className="nav-wrapper blue darken-3 left" >
                <SignedInLinks/>
                <SignOutLinks/>
        </nav>
    )
}

export default Navbar