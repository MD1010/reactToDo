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
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            retypedPassword: "",
            submitted: false,
        
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                retypedPassword: ""
            }
        }
    }
    componentDidMount(){
        $("#firstName").focus();
    }
    
    submitForm = (event) => {
        this.setState({submitted: true})
        event.preventDefault()
        let newUserData = {firstName:"", lastName: "", password:"", email:""}
        this.validateFormFields().then((valid)=>{

            if(valid){
                console.log(`--- new user details ---\n firstName:${this.state.firstName} lastName:${this.state.lastName} \n password:${this.state.password} \n email:${this.state.email}`) 
                let { firstName, lastName, password, email } = this.state
                newUserData.firstName = firstName
                newUserData.lastName = lastName
                newUserData.password = password
                newUserData.email = email
                
                postData(usersURL, newUserData).then(responseFromServer=>{
                    
                   if(responseFromServer.error)
                      this.setState({formErrors:{userName:"username already taken"}})
                   else{
                        this.setState({
                            firstName: "",
                            lastName: "",
                            password: "",
                            retypedPassword: "",
                            email: "",
                            submitted: false,
            
                            formErrors: {
                                firstName: "",
                                lastName:"",
                                email: "",
                                password: "",
                                retypedPassword: ""
                            }
                        })
                    }
                }) 
               
                $("#firstName").focus();
            }
            
            else
                console.error("Invalid form")
        })
       
    }
   
    validateFormFields = async () => 
    {
        let { firstName, lastName, password, email, retypedPassword } = this.state
        let valid = true
        let firstNameErrorMessage = firstName.trim() ? "" : "required field"
        let lastNameErrorMessage = lastName.trim() ? "" : "required field"
        let passwordErrorMessage = password.trim() ? "" : "required field"
        let emailErrorMessage = email.trim() ? "" : "required field"
        let retypedPasswordMessage = retypedPassword.trim() ? "" : "required field"
        const spaceRegex = RegExp(/\s/)
        const passwordRegex = RegExp(/^.{4,8}$/)
        const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
        if(passwordErrorMessage === "")
        passwordErrorMessage = passwordRegex.test(password) ? "": "password has to be between 4 and 8 characters" 
        if(emailErrorMessage === "")
        emailErrorMessage = emailRegex.test(email) ? "" : "Invalid Email address"
        if(passwordErrorMessage.length === 0 && retypedPassword) {
            retypedPasswordMessage = password == retypedPassword ? "" : "passwords don't match"
        }  
        await this.setState({
        formErrors : {
            firstName : firstNameErrorMessage,
            lastName : lastNameErrorMessage,
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
                {/* <div className="transparent-bg sign-up"></div> */}
                    <div className="title">Sign Up</div>
                <form className="form" onSubmit={this.submitForm}>
                        <div className="field">
                            {/* <i className="material-icons icon ">person</i>                          */}
                            <input className="firstName field" spellCheck="false" autoComplete="off" id="firstName" className={formErrors.firstName.length > 0 ? "error" : "input-bar"}  placeholder="first name" type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} maxLength="13"></input>
                            <label className="error-label">{formErrors.firstName}</label>  
                        </div>
                    
                    <div className="field">
                        {/* <i className="material-icons icon ">person</i>   */}
                        <input className="lastName field" spellCheck="false" autoComplete="off" id="lastName" className={formErrors.lastName.length > 0 ? "error" : "input-bar"}  placeholder="last name" type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} maxLength="13"></input>
                        <label className="error-label">{formErrors.lastName}</label>  
                    </div>
                   
                    <div className="field">
                        {/* <i className="material-icons icon ">email</i>  */}
                        <input className="email field" spellCheck="false" autoComplete="off" className={formErrors.email.length > 0 ? "error" : "input-bar"} placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange} maxLength="40"></input>                            
                        <label className="error-label">{formErrors.email}</label>
                    </div>
                    <div className="field">
                        {/* <i className="material-icons icon ">lock</i>  */}
                        <input className="password field" spellCheck="false" autoComplete="off" className={formErrors.password.length > 0 ? "error" : "input-bar"} placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                        <label className="error-label">{formErrors.password}</label>
                    </div>
                    <div className="field">
                        {/* <i className="material-icons icon ">keyboard</i>  */}
                        <input className="retypedPassword field" spellCheck="false" autoComplete="off" className={formErrors.retypedPassword.length > 0 ? "error" : "input-bar"} placeholder="retype password" type="password" id="retypedPassword" value={this.state.retypedPassword} onChange={this.handleChange} maxLength="13"></input>
                        <label className="error-label">{formErrors.retypedPassword}</label>
                    </div>
                    <button type="submit" id="submit-button" >Create Account</button>     
                </form>
                    
             </div>
            
            
        )
    }
}

export default SignUp