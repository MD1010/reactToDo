import React, { Component } from 'react'
import { postData } from '../../helpers/utils'
import { usersURL } from '../../helpers/consts'
import '../../styles/login.css'
import $ from 'jquery'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            userName: "",
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            retypedPassword: "",
            submitted: false,
        
            formErrors: {
                userName: "",
                email: "",
                password: "",
                retypedPassword: ""
            }
        }
    }
    componentDidMount(){
        $("#userName").focus();
    }
    
    submitForm = (event) => {
        this.setState({submitted: true})
        event.preventDefault()
        let newUserData = {userName:"", password:"", email:""}
        this.validateFormFields().then((valid)=>{

            if(valid){
                console.log(`--- new user details ---\n userName:${this.state.userName} \n password:${this.state.password} \n email:${this.state.email}`) 
                let { userName, password, email } = this.state
                newUserData.userName = userName
                newUserData.password = password
                newUserData.email = email
                
                postData(usersURL, newUserData).then(responseFromServer=>{
                    
                   if(responseFromServer.error)
                      this.setState({formErrors:{userName:"username already taken"}})
                   else{
                        this.setState({
                            firstName: "",
                            lastName: "",
                            userName: "",
                            password: "",
                            retypedPassword: "",
                            email: "",
                            submitted: false,
            
                            formErrors: {
                                userName: "",
                                email: "",
                                password: "",
                                retypedPassword: ""
                            }
                        })
                    }
                }) 
               
                $("#userName").focus();
            }
            
            else
                console.error("Invalid form")
        })
       
    }
   
    validateFormFields = async () => 
    {
        let { userName, password, email, retypedPassword } = this.state
        let valid = true
        const spaceRegex = RegExp(/\s/)
        const passwordRegex = RegExp(/^.{4,8}$/)
        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );
            let userErrorMessage = userName.trim().length >= 4 ? "": "userName has to be at least 4 characters"
            if(userErrorMessage === "")
            userErrorMessage = spaceRegex.test(userName) ? "username cannot have whitespaces" : ""
            let passwordErrorMessage = passwordRegex.test(password) ? "": "password has to be between 4 and 8 characters" 
            let emailErrorMessage = emailRegex.test(email) ? "" : "Invalid Email address"
            let retypedPasswordMessage = ""
            if(passwordErrorMessage.length === 0 && retypedPassword) {
                retypedPasswordMessage = password == retypedPassword ? "" : "passwords don't match"
            }  
            await this.setState({
            formErrors : {
                userName : userErrorMessage,
                email : emailErrorMessage,
                password : passwordErrorMessage,
                retypedPassword : retypedPasswordMessage
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
            <div className="bgForm">
                <div className="transparent-bg sign-up"></div>
                <form className="form" onSubmit={this.submitForm}>
                    <div className="title">Sign Up</div>

                    <div className="fullName">
                        <input className="firstName field" spellCheck="false" autoComplete="off" placeholder="firstName" type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} maxLength="13"></input>
                        <input className="lastName field" spellCheck="false" autoComplete="off"  placeholder="lastName" type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} maxLength="13"></input>
                    </div>
                    
                    <input className="username field" spellCheck="false" autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"}  placeholder="username" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} maxLength="13"></input>
                    <label className="error-label">{formErrors.userName}</label>  
                    
                    <input className="email field" spellCheck="false" autoComplete="off" className={formErrors.email.length > 0 ? "error" : "input-bar"} placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange} maxLength="40"></input>                            
                    <label className="error-label">{formErrors.email}</label>
                    
                    <input className="password field" spellCheck="false" autoComplete="off" className={formErrors.password.length > 0 ? "error" : "input-bar"} placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                    <label className="error-label">{formErrors.password}</label>
                    
                    <input className="retypedPassword field" spellCheck="false" autoComplete="off" className={formErrors.retypedPassword.length > 0 ? "error" : "input-bar"} placeholder="retype password" type="password" id="retypedPassword" value={this.state.retypedPassword} onChange={this.handleChange} maxLength="13"></input>
                    <label className="error-label">{formErrors.retypedPassword}</label>
                    
                    <button type="submit" id="submit-button" >Create Account</button>     
                </form>
            </div>
            
            
        )
    }
}

export default SignUp