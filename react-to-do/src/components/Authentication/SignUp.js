import React, { Component } from 'react'
import '../../styles/login.css'
import { connect } from 'react-redux'
import { SignUpNewUser } from '../../store/Actions/authActions'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                retypedPassword: ""
            }
    }
    componentDidMount() {
        $("#firstName").focus();
    }

    submitForm = (event) => {
        let { SignUp, auth } = this.props
        event.preventDefault()
        let newUserData = { firstName: "", lastName: "", password: "", email: "" }

        let { firstName, lastName, password, email } = this.state
        newUserData.firstName = firstName
        newUserData.lastName = lastName
        newUserData.password = password
        newUserData.email = email
        SignUp(newUserData)
        if (auth.uid) {
            $("#firstName").focus()
            this.setState({
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                retypedPassword: "",
                tasks: []
            })
        }
    }

    handleChange = (event) => {
        let { id, value } = event.target
        this.setState({ [id]: value })
    }
    render() {
        let { auth } = this.props
        if (auth.uid) {
            return <Redirect to='/MyTasks'></Redirect>
        }
        let { errors } = this.props
        return (
            <div className="bgForm">
                {/* <div className="transparent-bg sign-up"></div> */}
                <div className="title">Sign Up</div>

                <form className="form" onSubmit={this.submitForm}>
                    {/* <i className="material-icons icon ">person</i>                          */}
                    {/* <input spellCheck="false" autoComplete="off" id="firstName" className={formErrors.firstName.length > 0 ? "error field" : "input-bar field"} placeholder="first name" type="text" value={this.state.firstName} onChange={this.handleChange} maxLength="13"></input> */}
                    <input spellCheck="false" autoComplete="off" id="firstName" className="input-bar field" placeholder="first name" type="text" value={this.state.firstName} onChange={this.handleChange} maxLength="13"></input>
                    {/* <label className="error-label">{formErrors.firstName}</label> */}

                    {/* <i className="material-icons icon ">person</i>   */}
                    <input spellCheck="false" autoComplete="off" id="lastName" className="input-bar field" placeholder="last name" type="text" value={this.state.lastName} onChange={this.handleChange} maxLength="13"></input>
                    {/* <label className="error-label">{formErrors.lastName}</label> */}

                    {/* <i className="material-icons icon ">email</i>  */}
                    <input spellCheck="false" autoComplete="off" className="input-bar field" placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange} maxLength="40"></input>
                    {/* <label className="error-label">{formErrors.email}</label> */}
                    {/* <i className="material-icons icon ">lock</i>  */}
                    <input spellCheck="false" autoComplete="off" className="input-bar field" placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                    {/* <label className="error-label">{formErrors.password}</label> */}
                    {/* <i className="material-icons icon ">keyboard</i>  */}
                    <input spellCheck="false" autoComplete="off" className="input-bar field" placeholder="retype password" type="password" id="retypedPassword" value={this.state.retypedPassword} onChange={this.handleChange} maxLength="13"></input>
                    {/* <label className="error-label">{formErrors.retypedPassword}</label> */}
                    <button type="submit" id="submit-button" >Create Account</button>
                    <label className="error-label">{errors}</label>
                </form>
            </div>
        )
    }
}

const mapDispachToProps = (dispach) => {
    return {
        SignUp: (newUser) => { dispach(SignUpNewUser(newUser)) }
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispachToProps)(SignUp)