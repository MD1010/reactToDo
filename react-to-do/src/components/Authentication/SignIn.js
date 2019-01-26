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
            <div className="Form">
                <div className="title">
                    Sign In
                </div>
                
                <form onSubmit={this.submitForm}>
                    <table className="fields">
                        <tbody>
                            <tr className="username field">
                                <td>
                                    <input spellCheck="false" autoComplete="off" className="input-bar" placeholder="username" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} maxLength="13"></input>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="password field"> 
                                <td>
                                    <input spellCheck="false" autoComplete="off" className="input-bar" placeholder="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} maxLength="13"></input>
                                </td>

                            </tr>
                        </tbody> 
                        <tbody>
                            <tr> 
                                <td>
                                    <button type="submit" id="submit-button" >Sign In</button>
                                </td>
                            </tr>
                        </tbody> 
                    </table>   
                     
                  
                    
                </form>
            </div>

        )
    }
}

export default SignIn