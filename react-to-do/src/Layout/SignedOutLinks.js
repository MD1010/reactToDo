import React from 'react'
import { NavLink } from 'react-router-dom'

const SignOutLinks = () =>
{
    return(
        <ul className="right">
                <li><NavLink to='/SignIn'>Sign In</NavLink></li>
                <li><NavLink to='/SignUp'>Sign Up</NavLink></li>
        </ul>
    )
}

export default SignOutLinks