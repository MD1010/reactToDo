import React, { Component } from 'react'
import '../../styles/login.css'
import '../../styles/tasks.css'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LogIn } from '../../store/Actions/authActions'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                email: "",
                password: "",
                loading: false,
                submitted: false
            }
    }
    componentDidMount() {
        $("#email").focus();
    }

    submitForm = (event) => {
        let { LogUser } = this.props
        this.setState({submitted: true})
        event.preventDefault()
        let { email, password } = this.state
        if (email === "" || password === "")
            console.error("invalid form");
        else {
            LogUser(this.state)
        }
    }

    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value })
    }

    render() {
        const { auth } = this.props
        const { submitted } = this.state
        if (auth) {
            if (auth.uid) return <Redirect to='/MyTasks'></Redirect>
        }
        return (
            /* <div className={this.state.loading ? "spinner" : ""} /> */
            <div className="bgForm">
                <div className="transparent-bg sign-in"></div> 
                    <div className="title">Sign In</div>
                <form className="form" onSubmit={this.submitForm}>
                    {/* <i className="material-icons icon ">email</i>   */}
                    <input className="email field" id="email" spellCheck="false" autoComplete="new-password" placeholder="email" type="text" value={this.state.email} onChange={this.handleChange} maxLength="40"></input>
                    {/* <i className="material-icons icon ">lock</i>   */}
                    <input className="password field" spellCheck="false" autoComplete="new-password" placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="40"></input>
                    <button type="submit" id="submit-button" >Sign In</button>
                    <div className={submitted ? "error-label failedLogin": "hidden"}>{this.props.authError}</div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispachToProps = (dispach) => {
    return {
        LogUser: (credentials) => dispach(LogIn(credentials))
    }
}
export default connect(mapStateToProps, mapDispachToProps)(SignIn)