import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            userName: "",
            password: "",
            email: "",
            submitted: false,
        
            formErrors: {
                userName: "",
                email: "",
                password: ""
            }
        }
    }

    submitForm = (event) => {
        this.setState({submitted: true})
        event.preventDefault()
        this.validateFormFields().then((valid)=>{
            
            if(valid){
                console.log(`--- new user details ---\n userName:${this.state.userName} \n userName:${this.state.userName} \n email:${this.state.email}`) 
                 this.setState({
                    userName: "",
                    password: "",
                    email: "",
                    submitted: false,
    
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
        let { userName, password, email } = this.state
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
            if(this.state.submitted)
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
                                    <input autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange}></input>                            
                                </td>
                                <td>
                                    <label className="error-label">{formErrors.email}</label>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="password field"> 
                                <td>
                                    <input autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                                </td>
                                <td>
                                    <label className="error-label">{formErrors.password}</label>
                                </td>
                            </tr>
                        </tbody> 
                        <tbody>
                            <tr> 
                                <button type="submit" id="submit-button" >Create Account</button>
                            </tr>
                        </tbody> 
                    </table>   
                     
                  
                    
                </form>
            </div>

        )
    }
}

export default SignUp