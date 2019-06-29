import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogOut } from '../store/Actions/authActions'
import '../styles/tasks.css'

const SignedInLinks = (props) => {
    let { initials } = props
    return (
        <ul className="right">
            <li><NavLink to='/MyTasks'>My tasks</NavLink></li>
            <li><a onClick={props.LogOut}>Log Out</a></li>
            <li><NavLink to='/' className="btn-floating pink center">{initials}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    let user = state.firebase.profile    
    let initials = ""
    if (user.firstName && user.lastName) {
        initials = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    }
    return {
        initials: initials
    }

}
const mapDispachToProps = (dispach) => {
    return {
        LogOut: () => dispach(LogOut())
    }
}
export default connect(mapStateToProps, mapDispachToProps)(SignedInLinks)