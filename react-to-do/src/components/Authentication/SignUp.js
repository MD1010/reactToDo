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
                }) 
               
                $("#userName").focus();
            }
            
            else
                console.error("Invalid form")
        })
       
    }
   
    validateFormFields = async () => 
    {
        let { userName, password, email } = this.state
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
            <form className="form" onSubmit={this.submitForm}>
                <div className="title">Sign Up</div>
                <input className="username field" spellCheck="false" autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="username" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} maxLength="13"></input>
                <label className="error-label">{formErrors.userName}</label>  
                
                <input className="email field" spellCheck="false" autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange}></input>                            
                <label className="error-label">{formErrors.email}</label>
                
                <input className="password field" spellCheck="false" autoComplete="off" className={formErrors.userName.length > 0 ? "error" : "input-bar"} placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                <label className="error-label">{formErrors.password}</label>
                
                <button type="submit" id="submit-button" >Create Account</button>     
            </form>
        )
    }
}

export default SignUp