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
            email: "",
            password: ""
        }
    }
    componentDidMount(){
        $("#email").focus();
    }
    
    submitForm = (event) => {
        event.preventDefault()
    }
      
    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value })
    }

    render() {
        let { formErrors } = this.state
        return (
            <div className="bgForm">
                {/* <div className="transparent-bg sign-in"></div> */}
                    <div className="title">Sign In</div>
                    
                <form className="form" onSubmit={this.submitForm}>
                    <div className="field">
                        {/* <i className="material-icons icon ">email</i>   */}
                        <input className="email field" id="email" spellCheck="false" autoComplete="off" placeholder="email" type="text" id="email" value={this.state.email} onChange={this.handleChange} maxLength="40"></input>                            
                    </div>
                    <div className="field">
                        {/* <i className="material-icons icon ">lock</i>   */}
                        <input className="password field" spellCheck="false" autoComplete="off" placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="40"></input>
                    </div>
                    <button type="submit" id="submit-button" >Sign In</button>     
                </form>
             </div>
        )
    }
}

export default SignIn