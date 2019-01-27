import React, { Component } from 'react'
import { postData } from '../../helpers/utils'
import { usersURL } from '../../helpers/consts'
import '../../styles/login.css'
import $ from 'jquery'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            userName: "",
            password: ""
        }
    }
    componentDidMount(){
        $("#userName").focus();
    }
    
    submitForm = (event) => {
        
    }
      
    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value })
    }

    render() {
        let { formErrors } = this.state
        return (
            <div className="form">
                <div className="title">Sign In</div>                
                <form onSubmit={this.submitForm}>
                    <input className="username field" spellCheck="false" autoComplete="off" className="input-bar" placeholder="username" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} maxLength="13"></input>
                    <input className="password field" spellCheck="false" autoComplete="off" className="input-bar" placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                    <button type="submit" id="submit-button" >Login</button>     
                </form>
            </div>

        )
    }
}

export default SignIn