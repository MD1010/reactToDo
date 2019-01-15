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
            submitted : false,
        
            formErrors: {
                userName: "",
                email: "",
                password: "123"
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault()
        this.setState({submitted : true})
        this.validateFormFields().then((valid)=>{
            
            if(valid){
                this.setState({
                    userName: "",
                    password: "",
                    email: "",
                    submitted : false,
    
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

        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );
        let userErrorMessage = userName.trim().length < 4 ? "userName has to be at least 4 characters" : ""
        let passwordErrorMessage = password.trim().length < 4 || password.trim().length > 8 ? "password has to be between 4 and 8 characters" : ""
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
            this.state.submitted &&
            this.validateFormFields()
        });
    }

    render() {
        let { formErrors } = this.state
        return (
            <div className="row">
                <div className="card">
                    <div className="card-acion blue white-text center">
                        <h3>
                            Sign Up
                        </h3>
                    </div>
                    <div className="card-content">
                        <form onSubmit={this.submitForm} noValidate>
                            <div className="form-field">
                                <label>UserName</label>
                                <input type="text" id="userName" value={this.state.userName} onChange={this.handleChange}></input>
                                <label>{this.state.formErrors.userName}</label>
                            </div>
                            <br />

                            <div className="form-field">
                                <label>Email</label>
                                <input type="text" id="email" value={this.state.email} onChange={this.handleChange}></input>
                                <label>{this.state.formErrors.email}</label>
                            </div>
                            <br />

                            <div className="form-field">
                                <label>Password</label>
                                <input type="password" id="password" value={this.state.password} onChange={this.handleChange}></input>
                                <label>{this.state.formErrors.password}</label>
                            </div>
                            <br />

                            <div className="form-field">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember Me</label>
                            </div>
                            <br />

                            <div className="form-field">
                                <button className="btn-large waves-effect blue" type="submit" id="submit" >CREATE ACCOUNT</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default SignUp