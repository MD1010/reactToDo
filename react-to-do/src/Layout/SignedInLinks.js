import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () =>
{
    return(
        <ul className="right">
                <li><NavLink to='/MyTasks'>My tasks</NavLink></li>
                <li><NavLink to='/NewTask'>Add new task</NavLink></li>
                <li><NavLink to='/SignIn'>Log Out</NavLink></li>
                <li><NavLink to='/' className="btn-floating pink center">MD</NavLink></li>
        </ul>
    )
}

export default SignedInLinks