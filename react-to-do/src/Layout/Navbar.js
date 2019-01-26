import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignOutLinks from './SignedOutLinks';
import '../styles/navBar.css'
const Navbar = () =>
{
    return(
        <nav className="nav-wrapper blue darken-3" >
                <Link to='/' className="brand-logo">My Todo List</Link>
                <SignedInLinks/>
                <SignOutLinks/>
        </nav>
    )
}

export default Navbar