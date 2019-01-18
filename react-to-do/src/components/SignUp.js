import React, { Component } from 'react';
import { CLIENT_RENEG_WINDOW } from 'tls';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            userName: "",
            password: "",
            email: "",
        
            formErrors: {
                userName: "",
                email: "",
                password: ""
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault()
        this.validateFormFields().then((valid)=>{
            
            if(valid){
                this.setState({
                    userName: "",
                    password: "",
                    email: "",
    
                    formErrors: {
                        userName: "",
                        email: "",
                        password: ""
                    }
                })
            }

            else
                console.error("Invalid form")
        })
       
    }
   
    validateFormFields = async () => 
    {
        let { formErrors, userName, password, email } = this.state
        let valid = true
        const passwordRegex = RegExp(/.{4,9}/)
        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );
        let userErrorMessage = userName.trim().length >= 4 ? "": "userName has to be at least 4 characters"
        let passwordErrorMessage = passwordRegex.test(password) ? "": "password has to be between 4 and 8 characters" 
        let emailErrorMessage = emailRegex.test(email) ? "" : "Invalid Email address"
          
        await this.setState({
            formErrors : {
                userName : userErrorMessage,
                email : emailErrorMessage,
                password : passwordErrorMessage
            }
        })

         Object.values(this.state.formErrors).forEach(field => {
            field.length > 0 && (valid = false)
        }); 

        return valid
    }
        
    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value }, ()=>{
            this.validateFormFields()
        });
    }

    render() {
        let { formErrors } = this.state
        return (
            <div className="signUpForm">
                <div className="title">
                    Sign Up
                </div>
                
                <form onSubmit={this.submitForm}>
                    <table className="fields">
                        <tbody>
                            <tr className="username field">
                                <td>
                                    <label className="label">username</label>
                                </td>
                                <td>
                                    <input autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="username" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} maxLength="13"></input>
                                </td>
                                <td>
                                    <label className="error-label">{formErrors.userName}</label>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="email field">
                                <td>
                                    <label className="label">email</label>
                                </td>
                                <td>
                                    <input autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange} maxLength="13"></input>                            
                                </td>
                                <td>
                                    <label className="error-label">{formErrors.email}</label>
                                </td>
                            </tr>
                        </tbody>
                        <tdbody>
                            <tr className="password field">
                                <td>
                                    <label className="label">password</label>
                                </td>
                                <td>
                                    <input autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                                </td>
                                <td>
                                    <label className="error-label">{formErrors.password}</label>
                                </td>
                            </tr>
                        </tdbody> 
                    </table>   
                     
                   <button type="submit" id="submit-button" >Create Account</button>
                    
                </form>
            </div>

        )
    }
}

export default SignUp